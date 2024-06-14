import { z } from "zod";

import { zfd } from "zod-form-data";

const FOUR_MB = 4 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const CreatePostSchemaFormData = zfd.formData({
	title: zfd.text(
		z
			.string({ message: "Minimum is 5 characters." })
			.min(5, "Minimum is 5 characters.")
			.max(100),
	),
	description: zfd.text(
		z
			.string({ message: "Minimum is 5 characters." })
			.min(5, "Minimum is 5 characters.")
			.max(1000),
	),
	image: zfd.file(
		z
			.instanceof(File, { message: "Please provide a file" })
			.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
				message: "Only these types are allowed .jpg, .jpeg, .png and .webp",
			})
			.refine((file) => file.size <= FOUR_MB, {
				message: "File is too large. Max 4MB.",
			}),
	),
});

// export const CreatePostSchema = z.object({
//     title: z.string().min(5).max(100),
//     description: z.string().min(5).max(1000),
//     image: z
//         .instanceof(File, { message: "Expected a file" })
//         .refine(
//             (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
//             "Only these types are allowed .jpg, .jpeg, .png and .webp"
//         )
//         .refine((file) => file.size <= FOUR_MB, {
//             message: "File is too large. Max 4MB.",
//         }),
// });
