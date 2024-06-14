import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

const Spinner = ({
	className,
	size = 18,
}: { className?: string; size?: number }) => {
	return (
		<LoaderCircle
			className={cn("text-primary-foreground animate-spin", className)}
			size={size}
		/>
	);
};

export default Spinner;
