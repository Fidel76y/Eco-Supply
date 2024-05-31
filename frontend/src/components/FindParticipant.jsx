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



const FindParticipants = ({ role, supplyContract }) => {
	const [participantAddr, setParticipantAddr] = useState("");
	// const [participantAddr, setParticipantAddr] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
    const router = useRouter()

	const handleSubmit = async () => {
			// setIsLoading(true);
            if(!participantAddr) return toast.error("Please enter a participant id")
            router.push(`/account/${participantAddr}`)		
	};

	let buttonText = "Find Participant";



	return (
		<div>
			<AlertDialog
				open={showModal}
				onOpenChange={() => setShowModal((prev) => !prev)}
			>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Find Participant</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Fill in the details to find a participant
						</AlertDialogTitle>
						<div className="flex flex-col gap-8 py-4">
							<div className="flex flex-col gap-4">
								<Label htmlFor="participantAddr">Participant Address</Label>
								<Input
									id="participantAddr"
                                    required
									type="text"
									onChange={(e) => setParticipantAddr(e.target.value)}
									placeholder="Participant Address"
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

export default FindParticipants;
