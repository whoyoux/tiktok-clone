"use client";
import { createPost } from "@/actions/video";

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
import { CreatePostSchemaFormData } from "@/schemas/videos";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Spinner from "./ui/spinner";

const CreateVideoForm = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<z.infer<typeof CreatePostSchemaFormData>>({
		resolver: zodResolver(CreatePostSchemaFormData),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof CreatePostSchemaFormData>) {
		setIsUploading(true);
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("description", values.description);
		formData.append("video", values.video);

		const { data, serverError, validationErrors } = await createPost(formData);

		setIsUploading(false);

		if (serverError) {
			toast.error(serverError);
		}

		if (data) {
			toast.success(data.message);
			form.reset();
			if (fileInputRef.current) fileInputRef.current.value = null ?? "";
		}

		console.log(data);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<h2 className="text-2xl font-bold">Upload new video</h2>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="skibidi toilet" {...field} />
							</FormControl>
							<FormDescription>A short title for your clip.</FormDescription>
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
									placeholder="skibidi toilet yes yes skibidi iii"
									{...field}
								/>
							</FormControl>
							<FormDescription>A description of your video.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="video"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Video</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									placeholder="Picture"
									type="file"
									accept="image/*"
									onChange={(event) => onChange(event.target.files?.[0])}
									ref={fileInputRef}
								/>
							</FormControl>

							<FormDescription>
								Up to 25MB. Recommended size is 720x1280px
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={isUploading}
					className="flex items-center gap-2"
				>
					{isUploading && <Spinner />}
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default CreateVideoForm;
