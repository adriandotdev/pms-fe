"use client";

import { DataTablePagination } from "@/components/data-table-pagination";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "ID",
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

import { getProducts, Product } from "../queries/get-products.query";

const ProductComponent = () => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

	const { data, isLoading, refetch, isFetched } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts({ ...pagination }),
	});

	const table = useReactTable({
		data: data?.products.length ? (data?.products as unknown as Product[]) : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
		manualPagination: true,
		pageCount: Math.ceil((data?.totalProducts ?? 1) / pagination.pageSize) || 1,
		enableRowSelection: true,
	});

	useEffect(() => {
		refetch();
	}, [pagination, refetch]);

	return (
		<div className="space-y-3 mt-5">
			<h1 className="text-2xl font-bold">Products</h1>

			{isLoading && <div>Loading...</div>}

			{isFetched && <DataTablePagination table={table} />}
		</div>
	);
};

export default ProductComponent;
