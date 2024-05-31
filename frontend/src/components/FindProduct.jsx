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
import formatDate from "@/utils/formatDate";
import { useRouter } from "next/navigation";

const productState = {
    0: 'Manufactured',
    1: 'ShippedToDistributor',
    2: 'ShippedToRetailer',
    3: 'Sold'
}

const FindProduct = ({ role, supplyContract }) => {
	const [productId, setProductId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
    const router = useRouter()

	const handleSubmit = async () => {
            if(!productId) return toast.error("Please enter a product id")
            router.push(`/product/${productId}`)		
	};

	let buttonText = "Find Product";



	return (
		<div>
			<AlertDialog
				open={showModal}
				onOpenChange={() => setShowModal((prev) => !prev)}
			>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Find Product</Button>
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
                                    required
									type="number"
									onChange={(e) => setProductId(e.target.value)}
									placeholder="Product Id"
									className="col-span-3"
								/>
							</div>
						</div>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel >Cancel</AlertDialogCancel>
						<Button onClick={handleSubmit}>{buttonText}</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default FindProduct;
