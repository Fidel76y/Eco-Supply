"use client";
import * as React from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function DataTable({ columns, data }) {
	// console.log(data);
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});
	if (!data.length)
		return (
			<div>
				<p className="text-center mt-20">No data to display</p>
			</div>
		);

        console.log(data)

	return (
		<div className="w-full">
            <div>
                <p className="text-2xl font-semibold py-4">My products</p>
            </div>
			<div className="py-4 ">
				<Input
					placeholder="Filter name..."
					value={table?.getColumn("name")?.getFilterValue() ?? ""}
					onChange={(event) =>
						table?.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table?.getHeaderGroups()?.map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers?.map((header) => {
									return (
										<TableHead key={header.id}>
											{header?.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel().rows?.length ? (
							table?.getRowModel().rows?.map((row) => (
								<TableRow
									key={row.id}
									data-state={row?.getIsSelected() && "selected"}
								>
									{row?.getVisibleCells()?.map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table?.previousPage()}
					disabled={!table?.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table?.nextPage()}
					disabled={!table?.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
