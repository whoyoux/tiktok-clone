"server-only";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (
	!process.env.R2_ENDPOINT ||
	!process.env.R2_ACCESS_KEY ||
	!process.env.R2_SECRET_ACCESS_KEY ||
	!process.env.R2_BUCKET_NAME
) {
	throw new Error("env R2 is not defined! Aborted.");
}

export const S3 = new S3Client({
	region: "auto",
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

type ReturnUploadImage =
	| {
			success: true;
			url: string;
			key: string;
	  }
	| {
			success: false;
			error: string;
	  };
export const UploadImage = async (
	file: File,
	userId: string,
): Promise<ReturnUploadImage> => {
	try {
		const parallelUploads = new Upload({
			client: S3,
			params: {
				Bucket: process.env.R2_BUCKET_NAME,
				Key: `images/${userId}/${file.name}`,
				Body: file.stream(),
				ACL: "public-read",
				ContentType: file.type,
				Metadata: {
					userId: userId,
				},
			},
			queueSize: 4,
			leavePartsOnError: false,
		});

		const res = await parallelUploads.done();

		if (!res.Location || !res.Key) {
			return {
				success: false,
				error: "Failed to upload image",
			};
		}

		return {
			success: true,
			url: res.Location,
			key: res.Key,
		};
	} catch (err) {
		console.error(err);
		return {
			success: false,
			error: "Failed to upload image",
		};
	}
};

export const GetImageURL = (key?: string) => {
	return `https://pub-cb85655592d24665bc6f3fb45e2c1ef7.r2.dev/${key}`;
};
