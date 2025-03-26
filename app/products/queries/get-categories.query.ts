import axios from "axios";

interface Category {
	id: number;
	name: string;
}

interface CategoryResponse {
	categories: Category[];
}

export const getCategories = async () => {
	const response = await axios.get<CategoryResponse>(
		"http://localhost:5126/api/v1/categories"
	);

	return response.data.categories;
};
