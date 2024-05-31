"use client";
import { useState } from "react";
import Web3Context from "@/context/Web3Context";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

const PendingVerificationPage = () => {
	const { supplyContract, selectedAccount } = useContext(Web3Context);
	const [pendingVerifications, setPendingVerifications] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users =
					await supplyContract.getParticipantsWithPendingVerification();
				console.log(users);
				const allUsers = users.map((user, index) => {
					if (!user[2]) return;

					return {
						address: user[0],
						name: user[2],
						location: user[3],
						role: roles[Number(user[1].toString())],
						// isVerified: isUserVerified,
						verificationStatus: verifications[Number(user[4].toString())],
					};
				});

                if(allUsers[0] ) {
                    setPendingVerifications(allUsers);
                }


			} catch (error) {
				console.error("Error Fetching data:", error.message);
				error.reason && toast.error(error.reason);
			}
		};
		if (selectedAccount) fetchUsers();
	}, [supplyContract, selectedAccount]);
	return (
		<div className="p-6">
            <Link
				href={`/dashboard`}
				className="flex items-center text-sm hover:opacity-75 transition mb-6"
			>
				<ArrowLeft className="h-4 w-4 mr-2" />
				Back
			</Link>
			<DataTable columns={columns} data={pendingVerifications} />
		</div>
	);
};

export default PendingVerificationPage;
