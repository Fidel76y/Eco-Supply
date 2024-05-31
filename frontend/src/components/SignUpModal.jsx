import React, { useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";


const SignUpModal = ({
	showModal,
	supplyContract,
	setNoSignupNeeded,
	setShowModal,
}) => {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [role, setRole] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const handleNoSignUp = () => {
		setNoSignupNeeded(true);
		setShowModal(false);
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const response = await supplyContract.registerUser(
				Number(role),
				name,
				location
			);
			console.log(response);
			setShowModal(false);
            toast.success("Registration successful")
            window.location.reload();
		} catch (error) {
            console.log(error);
            toast.error(error.reason)
		} finally {
			setIsLoading(false);
		}

    };

	let buttonText = "Register";

	if (isLoading) {
		buttonText = (
			<>
				<Loader2 key="loader" className="mr-2 h-4 w-4 animate-spin" />{" "}
				Registering
			</>
		);
	}

	return (
		<AlertDialog open={showModal}>
			{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Join the participants</AlertDialogTitle>
					<AlertDialogDescription>
						Please fill in the details below to gain privileged access to this
						platform.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="location" className="text-right">
							Location
						</Label>
						<Input
							id="location"
							onChange={(e) => setLocation(e.target.value)}
							placeholder="Location"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<div className="col-span-3">
							<Select onValueChange={(value) => setRole(value)}>
								<SelectTrigger>
									<SelectValue placeholder="Select Role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">Manufacturer</SelectItem>
									<SelectItem value="2">Distributor</SelectItem>
									<SelectItem value="3">Retailer</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<AlertDialogFooter className="flex sm:justify-between">
					<Button disabled={isLoading} onClick={handleNoSignUp}>{"Continue Without Signup"}</Button>
					<Button onClick={handleSubmit}>{buttonText}</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default SignUpModal;
