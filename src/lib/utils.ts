import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const GetVideoURL = (key?: string) => {
	return `https://pub-cb85655592d24665bc6f3fb45e2c1ef7.r2.dev/${key}`;
};
