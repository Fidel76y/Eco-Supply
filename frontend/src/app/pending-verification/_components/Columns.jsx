import { ArrowUpDown  } from "lucide-react";
import { Button } from "@/components/ui/button";
import Actions from "./Actions";
import Link from "next/link";
export const columns = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<div>
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const name = row.getValue("name");
			const { address } = row.original;

			return (
				<Link
					className="ml-4  text-blue-500 hover:underline"
					href={`/account/${address}`}
				>
					{name}
				</Link>
			);
		},
	},
	{
		accessorKey: "address",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Address
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const address = row.getValue("address");

			return <div className="ml-4">{row.getValue("address")}</div>;
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Role
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const role = row.getValue("role");

			return <div className="ml-4">{row.getValue("role")}</div>;
		},
	},
	{
		accessorKey: "verificationStatus",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					VerificationStatus
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const verificationStatus = row.getValue("verificationStatus");

			return <div className="ml-4">{verificationStatus}</div>;
		},
	},
    {
		id: "actions",
		cell: ({ row }) => {
			const { address } = row.original;
			return (
				<Actions address={address}/>
			);
		},
	},
];
 