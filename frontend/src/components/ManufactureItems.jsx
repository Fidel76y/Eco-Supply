"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { ethers, BigNumber } from "ethers";

const ManufactureItems = ({ role, supplyContract }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const tx = await supplyContract.manufactureItem(name, description);
			const receipt = await tx.wait();

			console.log( await supplyContract.queryFilter('ItemManufactured'))


			toast.success("Manufactured item successfully");


			const itemManufacturedEvent = receipt.logs[0];
			const itemId = parseInt(itemManufacturedEvent.topics[1], 16)
			console.log(`Manufactured item with ID: ${itemId}`);
			setShowModal(false)
			window.location.reload();
		} catch (error) {
			console.log(error);
			error.reason && toast.error(error.reason);
		} finally {
			setIsLoading(false);
		}
	};

	let buttonText = "Manufacture Product";

	if (isLoading) {
		buttonText = (
			<>
				<Loader2 key="loader" className="mr-2 h-4 w-4 animate-spin" /> Please
				wait
			</>
		);
	}

	return (
		<div>
			<AlertDialog open={showModal} onOpenChange={() => setShowModal((prev) => !prev)}>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Manufacture Item</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Fill in the details of Manufactured product
						</AlertDialogTitle>
						{/* <AlertDialogDescription> */}
						<div className="flex flex-col gap-8 py-4">
							<div className="flex flex-col gap-4">
								<Label htmlFor="name">Product Name</Label>
								<Input
									id="name"
									onChange={(e) => setName(e.target.value)}
									placeholder="Product Name"
									className="col-span-3"
								/>
							</div>
							<div className="flex flex-col gap-4">
								<Label htmlFor="description">Product Description</Label>
								<Textarea
									id="description"
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Description"
									// className="col-span-3"
								/>
							</div>
						</div>
						{/* </AlertDialogDescription> */}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
						<Button onClick={handleSubmit}>{buttonText}</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ManufactureItems;
