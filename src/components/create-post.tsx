"use client";
import { createPost } from "@/actions/posts";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostSchemaFormData } from "@/schemas/posts";
import { useState } from "react";
import { toast } from "sonner";

const CreatePost = () => {
	const [image, setImage] = useState<File | null>(null);

	const form = useForm<z.infer<typeof CreatePostSchemaFormData>>({
		resolver: zodResolver(CreatePostSchemaFormData),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof CreatePostSchemaFormData>) {
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("description", values.description);
		formData.append("image", values.image);

		const { data, serverError, validationErrors } = await createPost(formData);

		if (serverError) {
			toast.error(serverError);
		}

		if (data) {
			toast.success(data.message);
			form.reset();
		}

		console.log(data);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<h2 className="text-2xl font-bold">Add new post</h2>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="VW Golf 2024" {...field} />
							</FormControl>
							<FormDescription>
								A short title for your advertisement.
							</FormDescription>
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
								<Textarea
									placeholder="Volkswagen Golf 2.0 diesel from 2024..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A detailed description of the item you are selling.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									placeholder="Picture"
									type="file"
									accept="image/*"
									onChange={(event) => onChange(event.target.files?.[0])}
								/>
							</FormControl>

							<FormDescription>You can add more images later.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CreatePost;
