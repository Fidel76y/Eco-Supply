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

const ShipToDistributor = ({ role, supplyContract }) => {
	const [productId, setProductId] = useState(0);
	const [distributorAddr, setDistributorAddr] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const tx = await supplyContract.shipItemToDistributor(
				productId,
				distributorAddr
			);
			const receipt = await tx.wait();
			toast.success("Item shipped to distributor");
			console.log(receipt);

			setShowModal(false);
            window.location.reload();

		} catch (error) {
			console.log(error);
            error.reason && toast.error(error.reason);
		} finally {
			setIsLoading(false);
		}
	};

	let buttonText = "Ship to Distributor";

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
			<AlertDialog
				open={showModal}
				onOpenChange={() => setShowModal((prev) => !prev)}
			>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Ship to Distributor</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Fill in the details to update product state
						</AlertDialogTitle>
						<div className="flex flex-col gap-8 py-4">
							<div className="flex flex-col gap-4">
								<Label htmlFor="productId">Product Id</Label>
								<Input
									id="productId"
									type="number"
									onChange={(e) => setProductId(e.target.value)}
									placeholder="Product Id"
									className="col-span-3"
								/>
							</div>
							<div className="flex flex-col gap-4">
								<Label htmlFor="distributorAddr">Distributor Address</Label>
								<Input
									id="distributorAddr"
									onChange={(e) => setDistributorAddr(e.target.value)}
									placeholder="Distributor Address"
								/>
							</div>
						</div>
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

export default ShipToDistributor;
