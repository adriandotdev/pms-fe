import { SortingState } from "@tanstack/react-table";
import axios from "axios";
export interface Product {
	id: number;
	name: string;
	price: number;
	category: Category;
	createdAt: string;
	expirationDate: string;
	description: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface QueryResponse {
	products: Product[];
	totalProducts: number;
}

export const getProducts = async (
	pagination: { pageSize: number; pageIndex: number },
	sorting: SortingState
) => {
	const { pageSize, pageIndex } = pagination;

	// Ensure sorting is not empty before accessing sorting[0]
	const sortDirection = sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

	const response = await axios.get<QueryResponse>(
		`http://localhost:5126/api/v1/products?pageSize=${pageSize}&pageNumber=${
			pageIndex + 1
		}${sorting.length > 0 ? `&sortDirection=${sortDirection}` : ""}`
	);

	return response.data;
};
