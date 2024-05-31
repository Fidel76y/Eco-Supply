"use client";
import { useState } from "react";
import Web3Context from "@/context/Web3Context";
import React, { useContext, useEffect } from "react";
import ManufactureItems from "@/components/ManufactureItems";
import ShipToDistributor from "@/components/ShipToDistributor";
import FindProduct from "@/components/FindProduct";
import FindParticipant from "@/components/FindParticipant";
import SellProduct from "@/components/SellProduct";
import ShipToRetailer from "@/components/ShipToRetailer";
import { columns } from "@/app/dashboard/_components/Columns";
import { DataTable } from "@/app/dashboard/_components/DataTable";
import toast from "react-hot-toast";
import RequestVerification from "@/components/RequestVerification";
import PendingVerifications from "@/components/PendingVerifications";
import { BadgeCheck, Loader2 } from "lucide-react";

// import Header from '@/components/Header'

const roles = {
	0: "Owner",
	1: "Manufacturer",
	2: "Distributor",
	3: "Retailer",
};

const verifications = {
	0: "Not Requested",
	1: "Pending",
	2: "Approved",
	3: "Rejected",
};

const currentState = {
	0: "Manufactured",
	1: "Shipped to distributor",
	2: "Shipped to retailer",
	3: "Sold",
};

const unregisteredAddress = "0x0000000000000000000000000000000000000000";

const Dashboard = () => {
	const { supplyContract, selectedAccount } = useContext(Web3Context);
	const [productsList, setProductsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [participantName, setParticipantName] = useState("");
	const [participantLocation, setParticipantLocation] = useState("");
	const [participantRole, setParticipantRole] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState("");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const participant = await supplyContract.participants(selectedAccount);
				if (participant[0] === unregisteredAddress) {
					return;
				}
				const verificationStat = Number(participant[4].toString());
				const userRole = roles[Number(participant[1].toString())];

				const isUserVerified = verificationStat === 2;

				setParticipantName(participant[2]);
				setParticipantLocation(participant[3]);
				setParticipantRole(userRole);
				setIsVerified(isUserVerified);
				// setVerificationStatus(participant[3]);
				setVerificationStatus(verifications[verificationStat]);

				// console.log(userRole);

				const userProduct = await supplyContract[`get${userRole}Items`](
					selectedAccount
				);

				console.log(userProduct);

				const allUserProducts = userProduct.map((item, index) => {
					return {
						id: Number(item[10].toString()),
						name: item[0],
						manufacturer: item[3][2],
						manufacturerAddress: item[3][0],
						distributor: item[4][2],
						distributorAddress: item[4][0],
						retailer: item[5][2],
						retailerAddress: item[5][0],
						stage: currentState[Number(item[2].toString())],
					};
				});

				setProductsList(allUserProducts);
			} catch (error) {
				console.error("Error Fetching data:", error.message);
				error.reason && toast.error(error.reason);
			} finally {
				setIsLoading(false);
			}
		};
		if (selectedAccount) fetchUser();
	}, [supplyContract, selectedAccount]);

	if (isLoading)
		return (
			<div className="flex min-h-[80vh] justify-center items-center">
				<Loader2 key="loader" className="mr-2 h-10 w-10 animate-spin" />{" "}
			</div>
		);

	return (
		<div className="p-6 space-y-6 ">
			<div className="flex gap-3 flex-wrap justify-between">
				{participantRole === "Manufacturer" && (
					<ManufactureItems supplyContract={supplyContract} />
				)}
				{participantRole === "Manufacturer" && (
					<ShipToDistributor supplyContract={supplyContract} />
				)}
				{participantRole === "Distributor" && (
					<ShipToRetailer supplyContract={supplyContract} />
				)}
				{participantRole === "Retailer" && (
					<SellProduct supplyContract={supplyContract} />
				)}
				<FindProduct supplyContract={supplyContract} />
				<FindParticipant supplyContract={supplyContract} />
				{verificationStatus !== "Pending" &&
					verificationStatus !== "Approved" && participantName && (
						<RequestVerification supplyContract={supplyContract} />
					)}
				{participantRole === "Owner" && <PendingVerifications />}
			</div>
			{participantName && (
				<>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Welcome, {participantName}</h2>
						<p>
							<strong>Location: </strong>
							{participantLocation}
						</p>
						<p>
							{" "}
							<strong>Role: </strong> {participantRole}
						</p>
						<p className="inline-flex gap-1">
							{" "}
							<strong>Verification Status: </strong> {verificationStatus}{" "}
							{verificationStatus === "Approved" && (
								<BadgeCheck className="text-green-600" />
							)}
						</p>
					</div>
					<DataTable columns={columns} data={productsList} />
				</>
			)}
		</div>
	);
};

export default Dashboard;
