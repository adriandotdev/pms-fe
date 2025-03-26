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

export const getProducts = async ({
	pageSize,
	pageIndex,
}: {
	pageSize: number;
	pageIndex: number;
}) => {
	const response = await axios.get<QueryResponse>(
		`http://localhost:5126/api/v1/products?pageSize=${pageSize}&pageNumber=${
			pageIndex + 1
		}`
	);

	return response.data;
};
