import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
	return (
		<div className="w-full text-center flex flex-col gap-4 pt-10">
			<h1 className="text-4xl font-bold">Page not found</h1>
			<div>
				<Link href="/" className={cn(buttonVariants({}))}>
					Go back home
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
