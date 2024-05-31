"use client";
import Web3Context from "@/context/Web3Context";
import { useContext, useState } from "react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

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

const unregisteredAddress = "0x0000000000000000000000000000000000000000";

const ParticipantInfo = ({ participantAddr }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { supplyContract, selectedAccount, chainId } = useContext(Web3Context);
	const [participantName, setParticipantName] = useState("");
	const [participantLocation, setParticipantLocation] = useState("");
	const [participantRole, setParticipantRole] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState("");
	const [isLoggedUser, setIsLoggedUser] = useState(false);

	useEffect(() => {
		const loggedUser =
			selectedAccount?.toLowerCase() === participantAddr?.toLowerCase();
		// console.log(loggedUser)
		setIsLoggedUser(loggedUser);
	}, [participantAddr, selectedAccount]);

	// console.log(participantAddr.toLowerCase());
	// console.log(selectedAccount.toLowerCase());
	// console.log(isLoggedUser);

	useEffect(() => {
		const getParticipantInfo = async () => {
			try {
				// setIsLoading(true);

				// Call the contract function and wait for the transaction to be mined
				const participant = await supplyContract.participants(participantAddr);
				if (participant[0] === unregisteredAddress) {
					return;
				}
				const verificationStat = Number(participant[4].toString());
				const userRole = Number(participant[1].toString());

				const isUserVerified = verificationStat === 2;

				setParticipantName(participant[2]);
				setParticipantLocation(participant[3]);
				setParticipantRole(roles[userRole]);
				setIsVerified(isUserVerified);
				// setVerificationStatus(participant[3]);
				setVerificationStatus(verifications[verificationStat]);
			} catch (error) {
				console.log(error);
				error.reason && toast.error(error.reason);
			} finally {
				setIsLoading(false);
			}
		};

		selectedAccount && getParticipantInfo();
	}, [participantAddr,supplyContract, chainId, selectedAccount]);

	if (isLoading)
		return (
			<div className="flex min-h-[80vh] justify-center items-center">
				<Loader2 key="loader" className="mr-2 h-10 w-10 animate-spin" />{" "}
			</div>
		);
	return (
		<div className="p-6">
			<Link
				href={`/dashboard`}
				className="flex items-center text-sm hover:opacity-75 transition mb-6"
			>
				<ArrowLeft className="h-4 w-4 mr-2" />
				Back
			</Link>
			{participantName ? (
				<div className="w-full max-w-3xl mx-auto p-6">
					<div className="text-3xl font-bold mb-4 flex items-center gap-4">
						<h1>{participantName}</h1>{" "}
						{isVerified && <BadgeCheck className="text-green-600" />}
					</div>
					<h3 className="text-lg">
						<strong>Role: </strong> {participantRole}
					</h3>
					<p className="text-lg">
						<strong>Address: </strong> {participantAddr}
					</p>
					<p className="text-lg">
						<strong>Location: </strong>
						{participantLocation}
					</p>
					{isLoggedUser && (
						<p className="text-lg">
							<strong>Verification Status: </strong>
							{verificationStatus}
						</p>
					)}
				</div>
			) : (
				<div>
					<p className="text-center mt-20">No user found with the address</p>
				</div>
			)}
		</div>
	);
};

export default ParticipantInfo;
