import axios from "axios";

export interface CreateCategorySchema {
	name: string;
	description?: string | null;
}

export const createCategory = async (input: CreateCategorySchema) => {
	await axios.post("http://localhost:5126/api/v1/categories", input);
};
