"use client";

import { createCategory } from "@/app/mutations/create-category.mutation";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1, { message: "Please provide a category name." }),
	description: z.string().optional(),
});

const CreateCategoryPage = () => {
	const createNewCategory = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			form.reset();

			toast.info("Category successfully created", { position: "top-right" });
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
		mode: "all",
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await createNewCategory.mutateAsync({
			name: values.name,
			description: values.description ?? null,
		});
	}

	return (
		<div className="mt-5">
			<h1 className="text-2xl font-bold">New Category</h1>

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
										placeholder="Please provide a category name"
										{...field}
									/>
								</FormControl>
								<FormMessage data-cy="name-error-message" />
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
									<Textarea
										data-cy="description"
										placeholder="Description (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage data-cy="price-error-message" />
							</FormItem>
						)}
					/>
					<Button className="w-full" name="submit" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateCategoryPage;
