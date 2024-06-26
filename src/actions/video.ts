"use server";

import { prisma } from "@/lib/prisma";
import { UploadVideo } from "@/lib/r2";
import { authAction } from "@/lib/safe-action";
import { CreatePostSchemaFormData } from "@/schemas/videos";
import { redirect } from "next/navigation";
import sharp from "sharp";

export const createPost = authAction(
	CreatePostSchemaFormData,
	async ({ title, description, video }, { session }) => {
		// const compressedImageBuffer = await sharp(await image.arrayBuffer())
		// 	.webp({ quality: 100 })
		// 	.toBuffer();

		// const compressedImageBlob = new Blob([compressedImageBuffer]);

		// const compressedImage = new File(
		// 	[compressedImageBlob],
		// 	`post-img-${image.name.split(".")[0]}-${Date.now()}.webp`,
		// 	{ type: "image/webp" },
		// );

		const uploadedImage = await UploadVideo(video, session.user.id);

		if (!uploadedImage.success) {
			console.error(uploadedImage.error);
			throw new Error("Failed to upload image");
		}

		const post = await prisma.post.create({
			data: {
				title,
				description,
				video: {
					create: {
						url: uploadedImage.url,
						key: uploadedImage.key,
						user: {
							connect: {
								id: session.user.id,
							},
						},
					},
				},
				user: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});

		return {
			success: true,
			message: "Post created successfully.",
		};
	},
);
