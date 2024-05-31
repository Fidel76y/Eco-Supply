import { useRouter } from 'next/navigation';
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Web3Context from "@/context/Web3Context";
import { useContext } from "react";
import toast from 'react-hot-toast';
const Actions = ({ address }) => {
	const { supplyContract, selectedAccount } = useContext(Web3Context);
    const router = useRouter();

	const handleApprove = async () => {
		try {
			const tx = await supplyContract.approveVerification(address);
			// const receipt = await tx.wait();
			toast.success(
				"Verification request has been approved successfully"
			);
            window.location.reload();
		} catch (error) {
			console.log(error);
			error.reason && toast.error(error.reason);
		}
	};
	
    const handleReject = async () => {
		try {
			const tx = await supplyContract.rejectVerification(address);
			// const receipt = await tx.wait();
			toast.success(
				"Verification request has been rejected successfully"
			);
            router.refresh();

		} catch (error) {
			console.log(error);
			error.reason && toast.error(error.reason);
		}
	};
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-4 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{/* <Link to={`/tutors/edit-course/${id}`}> */}
					<DropdownMenuItem onClick={handleApprove}>
						<Pencil className="h-4 w-4 mr-2" />
						Approve
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleReject}>
						<Pencil className="h-4 w-4 mr-2" />
						Reject
					</DropdownMenuItem>
					{/* </Link> */}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Actions;
