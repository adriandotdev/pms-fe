"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { z } from "zod";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { createNewProduct } from "../../mutations/create-product.mutation";
import { getCategories } from "../../queries/get-categories.query";
import { DatePicker } from "./date-picker";

const formSchema = z.object({
	name: z.string().min(1, { message: "Please provide a product name." }),
	price: z.coerce
		.number()
		.min(1, { message: "Please provide a product price." }),
	categoryId: z.string(),
	expirationDate: z.string().optional(),
	description: z.string().optional(),
});

const CreateProductPage = () => {
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const createProduct = useMutation({
		mutationFn: createNewProduct,
		onSuccess: () => {
			form.reset();
			toast.info("Product successfully created", { position: "top-right" });
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			price: 0,
			categoryId: categories?.length ? categories[0].id.toString() : "",
		},

		mode: "all",
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		await createProduct.mutateAsync({
			Name: values.name,
			Price: values.price,
			CategoryId: +values.categoryId,
			ExpirationDate: values.expirationDate ?? null,
			Description: values.description ?? null,
		});
	}

	useEffect(() => {
		form.setValue(
			"categoryId",
			categories?.length ? categories[0].id.toString() : ""
		);
	}, [categories, form]);

	return (
		<div className="mt-5">
			<h1 className="text-2xl font-bold">New Product</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5 max-w-[30rem] mt-3"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										data-cy="name"
										placeholder="Please provide a name here"
										{...field}
									/>
								</FormControl>
								<FormMessage data-cy="name-error-message" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										data-cy="price"
										placeholder="Please provide a product price here"
										{...field}
									/>
								</FormControl>
								<FormMessage data-cy="price-error-message" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categories</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value || categories?.[0]?.id.toString()}
								>
									<FormControl>
										<SelectTrigger data-cy="category" className="w-full">
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="expirationDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Expiration Date</FormLabel>
								<DatePicker field={field} />
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Description (optional)" {...field} />
								</FormControl>
								<FormMessage data-cy="price-error-message" />
							</FormItem>
						)}
					/>
					<Button name="submit" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateProductPage;
