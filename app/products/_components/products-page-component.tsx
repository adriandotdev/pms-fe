"use client";

import { DataTablePagination } from "@/components/data-table-pagination";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { getProducts, Product } from "../../queries/get-products.query";

const columns = (
	setSorting: (sorting: SortingState) => void
): ColumnDef<Product>[] => [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
						const isDesc = column.getIsSorted() === "asc";
						setSorting([{ id: "id", desc: isDesc }]);
					}}
				>
					ID
					{column.getIsSorted() === "asc" ? (
						<>
							<ArrowUp />
						</>
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			if (!row.original.description) return "--";

			if (row.original.description.length > 25)
				return row.original.description.slice(0, 25).concat("...");

			return row.original.description;
		},
	},
	{
		accessorKey: "category.name",
		header: "Category",
	},
	{
		accessorKey: "createdAt",
		header: "Date Created",
	},
	{
		accessorKey: "expirationDate",
		header: "Expiration Date",
		cell: ({ row }) => {
			return row.original.expirationDate ? row.original.expirationDate : "--";
		},
	},
];

const ProductComponent = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "id", desc: false },
	]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const { data, isLoading, refetch, isFetched } = useQuery({
		queryKey: ["products", pagination, sorting],
		queryFn: () => getProducts(pagination, sorting),
	});

	const table = useReactTable({
		data: data?.products.length ? (data?.products as unknown as Product[]) : [],
		columns: columns(setSorting),
		getCoreRowModel: getCoreRowModel(),
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: { pagination, sorting, columnFilters },
		enableRowSelection: true,
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		pageCount: Math.ceil((data?.totalProducts ?? 1) / pagination.pageSize) || 1,
	});

	useEffect(() => {
		refetch();
	}, [pagination, refetch, sorting]);

	return (
		<div className="space-y-3 mt-5">
			{isLoading && <div>Loading...</div>}
			<div className="flex items-center gap-3">
				<h1 className="text-2xl font-bold">Products</h1>
				<Input
					placeholder="Search product here"
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) => {
						console.log(event.target.value);
						table.getColumn("name")?.setFilterValue(event.target.value);
					}}
					className="max-w-sm"
				/>
			</div>
			{isFetched && <DataTablePagination table={table} />}
		</div>
	);
};

export default ProductComponent;
