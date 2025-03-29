"use client";

import { Category, getCategories } from "@/app/queries/get-categories.query";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			return row.original.description?.length ? row.original.description : "--";
		},
	},
	{
		accessorKey: "products",
		header: "No. of Products",
		cell: ({ row }) => {
			return row.original.products.length;
		},
	},
	{
		accessorKey: "createdAt",
		header: "Date Created",
	},
];

const CategoriesPage = () => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const { data, isLoading, refetch, isFetched } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const table = useReactTable({
		data: data?.categories.length
			? (data.categories as unknown as Category[])
			: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
		manualPagination: true,
		pageCount:
			Math.ceil((data?.totalCategories ?? 1) / pagination.pageSize) || 1,
		enableRowSelection: true,
	});

	useEffect(() => {
		refetch();
	}, [pagination, refetch]);

	return (
		<div className="space-y-3 mt-5">
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Categories</h1>

				<Link href="/categories/new">
					<Button>Create Category</Button>
				</Link>
			</div>

			{isLoading && <div>Loading...</div>}

			{isFetched && <DataTablePagination table={table} />}
		</div>
	);
};

export default CategoriesPage;
