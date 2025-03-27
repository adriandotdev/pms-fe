import axios from "axios";

interface ProductInput {
	Name: string;
	Price: number;
	CategoryId: number;
	ExpirationDate: string | null;
	Description: string | null;
}

export const createNewProduct = async (input: ProductInput) => {
	await axios.post("http://localhost:5126/api/v1/products", input);
};
