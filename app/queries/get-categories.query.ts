import axios from "axios";
import { Product } from "./get-products.query";

export interface Category {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	products: Product[];
}

interface CategoryResponse {
	categories: Category[];
	totalCategories: number;
}

export const getCategories = async () => {
	const response = await axios.get<CategoryResponse>(
		"http://localhost:5126/api/v1/categories"
	);

	return response.data;
};
