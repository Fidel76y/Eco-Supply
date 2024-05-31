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
import React, { useContext, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Web3Context from "@/context/Web3Context";

const RequestVerification = ({ role, supplyContract }) => {
	const { selectedAccount } = useContext(Web3Context);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [file, setFile] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			const formData = {
				name: name,
				address: selectedAccount,
				role: role,
				email: email,
				message: message,
				file: file,
			};

			console.log(formData);

			const response = await axios.post("/api/verify", formData);

			// const data = await response.text();
			console.log(response)

			const tx = await supplyContract.requestVerification();
			// const receipt = await tx.wait();
			toast.success("Your verification request has been submitted successfully");
			console.log(tx);

			setShowModal(false);
		} catch (error) {
			console.log(error);
            error.reason && toast.error(error.reason);
		} finally {
			setIsLoading(false);
		}
	};

	let buttonText = "Request Verification";

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
					<Button variant="outline">Request Verification</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<form action="" onSubmit={handleSubmit}>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Fill in the details required for verification
							</AlertDialogTitle>
							<div className="flex flex-col gap-8 py-4">
								<div className="flex flex-col gap-4">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										type="text"
										onChange={(e) => setName(e.target.value)}
										placeholder="Your name"
										className="col-span-3"
										required
									/>
								</div>
								<div className="flex flex-col gap-4">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Your email"
										className="col-span-3"
										required
									/>
								</div>
								<div className="flex flex-col gap-4">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										type="text"
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Your message"
										className="col-span-3"
										required
									/>
								</div>
								<div className="flex flex-col gap-4">
									<Label htmlFor="file">Attach valid ID document</Label>
									<Input
										id="file"
										type="file"
										accept="image/*"
										onChange={(e) => setFile(e.target.files[0])}
										required
									/>
								</div>
							</div>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel type={"button"} disabled={isLoading}>
								Cancel
							</AlertDialogCancel>
							<Button type={"submit"}>{buttonText}</Button>
						</AlertDialogFooter>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default RequestVerification;
