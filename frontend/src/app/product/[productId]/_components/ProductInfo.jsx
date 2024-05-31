"use client";
import Web3Context from "@/context/Web3Context";
import formatDate from "@/utils/formatDate";
import { useContext, useState } from "react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TimelineCard from "./TimelineCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const currentState = {
	0: "Manufactured",
	1: "Shipped to distributor",
	2: "Shipped to retailer",
	3: "Sold",
};

const ProductInfo = ({ productId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { supplyContract, selectedAccount } = useContext(Web3Context);
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productState, setProductState] = useState("");
	const [productInfo, setProductInfo] = useState([]);
	// const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getProductInfo = async () => {
			try {
				// setIsLoading(true);

				// Call the contract function and wait for the transaction to be mined
				const product = await supplyContract.getItemDetails(productId);
				setProductName(product[0]);
				setProductDescription(product[1]);
				setProductState(currentState[product[2]]);
				console.log(product);
				const state = Number(product[2].toString());
				console.log(state);
				const manDate = product[6].toString();
				const distrDate = product[7].toString();
				const retailDate = product[8].toString();
				const soldDate = product[9].toString();
				console.log(product);

				if (state === 0) {
					setProductInfo([
						{
							id: 1,
							title: "Manufactured",
							date: formatDate(manDate),
							name: product[3][2],
							address: product[3][0],
							description: "Item was manufactured by ",
						},
						{
							id: 2,
							title: "Shipped to distributor",
							date: "",
							name: "",
							address: "",
							description: "Item was shipped to the distributor",
						},
						{
							id: 3,
							title: "Shipped to retailer",
							date: "",
							name: "",
							address: "",
							description: "Item was shipped to the retailer",
						},
						{
							id: 4,
							title: "Sold",
							date: "",
							name: "",
							address: "",
							description: "Item was sold",
						},
					]);
				} else if (state === 1) {
					setProductInfo([
						{
							id: 1,
							title: "Manufactured",
							date: formatDate(manDate),
							name: product[3][2],
							address: product[3][0],
							description: "Item was manufactured by ",
						},
						{
							id: 2,
							title: "Shipped to distributor",
							date: formatDate(distrDate),
							name: product[4][2],
							address: product[4][0],
							description: "Item was shipped to the distributor",
						},

						{
							id: 3,
							title: "Shipped to retailer",
							date: "",
							name: "",
							address: "",
							description: "Item was shipped to the retailer",
						},
						{
							id: 4,
							title: "Sold",
							date: "",
							name: "",
							address: "",
							description: "Item was sold",
						},
					]);
				} else if (state === 2) {
					setProductInfo([
						{
							id: 1,
							title: "Manufactured",
							date: formatDate(manDate),
							name: product[3][2],
							address: product[3][0],
							description: "Item was manufactured by ",
						},
						{
							id: 2,
							title: "Shipped to distributor",
							date: formatDate(distrDate),
							name: product[4][2],
							address: product[4][0],
							description: "Item was shipped to the distributor",
						},
						{
							id: 3,
							title: "Shipped to retailer",
							date: formatDate(retailDate),
							name: product[5][2],
							address: product[5][0],
							description: "Item was shipped to the retailer",
						},

						{
							id: 4,
							title: "Sold",
							date: "",
							name: "",
							address: "",
							description: "Item was sold",
						},
					]);
				} else if (state === 3) {
					setProductInfo([
						{
							id: 1,
							title: "Manufactured",
							date: formatDate(manDate),
							name: product[3][2],
							address: product[3][0],
							description: "Item was manufactured by ",
						},
						{
							id: 2,
							title: "Shipped to distributor",
							date: formatDate(distrDate),
							name: product[4][2],
							address: product[4][0],
							description: "Item was shipped to the distributor",
						},
						{
							id: 3,
							title: "Shipped to retailer",
							date: formatDate(retailDate),
							name: product[5][2],
							address: product[5][0],
							description: "Item was shipped to the retailer",
						},
						{
							id: 4,
							title: "Sold",
							date: formatDate(soldDate),
							name: product[5][2],
							address: product[5][0],
							description: "Item was sold",
						},
					]);
				}
			} catch (error) {
				console.log(error);
				error.reason && toast.error(error.reason);
			} finally {
				setIsLoading(false);
			}
		};

		getProductInfo();
	}, [supplyContract, productId]);

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
			{productName ? (
				<div className="w-full max-w-3xl mx-auto">
					<div className="border rounded-xl space-y-3 bg-gray-200 p-7 mb-8">
						<h1 className="text-3xl font-bold mb-4">{productName}</h1>
						<p className="text-lg">
							{" "}
							<span className="font-[600]">ID: </span>
							{productId}
						</p>
						<p className="text-lg">
							{" "}
							<span className="font-[600]">Description: </span>
							{productDescription}
						</p>
						<p className="text-lg ">
							{" "}
							<span className="font-[600] ">Current Stage: </span>{" "}
							<span className="italic">{productState}</span>{" "}
						</p>
					</div>
					<div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
						{/* <!-- Item #1 --> */}
						{/* <!-- Icon --> */}
						{productInfo.map((item) => (
							<TimelineCard key={item.id} item={item} />
						))}
						{/* <TimelineCard /> */}
					</div>
					{/* <!-- End: Vertical Timeline #2 --> */}
				</div>
			) : (
				<div>
					<p className="text-center mt-20">No product found with the id</p>
				</div>
			)}
		</div>
	);
};

export default ProductInfo;
