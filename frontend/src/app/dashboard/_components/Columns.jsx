import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const columns = [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Id
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const id = row.getValue("id");

			return <div className="ml-4">{row.getValue("id")}</div>;
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<div >

				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Product Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const name = row.getValue("name");
			const { id } = row.original;

			return (
				<Link
					className="ml-4  text-blue-500 hover:underline"
					href={`/product/${id}`}
				>
					{name}
				</Link>
			);
		},
	},
	{
		accessorKey: "manufacturer",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Manufacturer
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const manufacturer = row.getValue("manufacturer");
			const { manufacturerAddress } = row.original;

			return manufacturer ? (
				<Link
					className="ml-4 text-blue-500 hover:underline"
					href={`/account/${manufacturerAddress}`}
				>
					{manufacturer}
				</Link>
			) : (
				<p className="ml-4" href={`/account/${manufacturerAddress}`}>
					Not available
				</p>
			);
		},
	},
	{
		accessorKey: "distributor",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Distributor
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const distributor = row.getValue("distributor");
			const { distributorAddress } = row.original;

			return distributor ? (
				<Link
					className="ml-4 text-blue-500 hover:underline"
					href={`/account/${distributorAddress}`}
				>
					{distributor}
				</Link>
			) : (
				<p className="ml-4" href={`/account/${distributorAddress}`}>
					Not available
				</p>
			);
		},
	},
	{
		accessorKey: "retailer",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Retailer
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const retailer = row.getValue("retailer");
			const { retailerAddress } = row.original;

			return retailer ? (
				<Link
					className="ml-4 text-blue-500 hover:underline"
					href={`/account/${retailerAddress}`}
				>
					{retailer}
				</Link>
			) : (
				<p className="ml-4" href={`/account/${retailerAddress}`}>
					Not available
				</p>
			);
		},
	},

	{
		accessorKey: "stage",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					State
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const stage = row.getValue("stage");
			return (
				<Badge
					className={cn("bg-slate-500 ml-4", stage === "Sold" && "bg-sky-700")}
				>
					{stage}
				</Badge>
			);
		},
	},
	
];
