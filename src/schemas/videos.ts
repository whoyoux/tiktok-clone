import { z } from "zod";

import { zfd } from "zod-form-data";

const MAX_SIZE = 25 * 1024 * 1024;
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"];

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
	video: zfd.file(
		z
			.instanceof(File, { message: "Please provide a file" })
			.refine((file) => ACCEPTED_VIDEO_TYPES.includes(file.type), {
				message: "Only these types are allowed .mp4, .webm.",
			})
			.refine((file) => file.size <= MAX_SIZE, {
				message: "File is too large. Max 25MB.",
			}),
	),
});
