import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { GetImageURL } from "@/lib/r2";
import type { Post, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const posts = await prisma.post.findMany({ include: { mainImage: true } });
	return (
		<main className="max-w-screen-md mx-auto">
			<div className="flex flex-col gap-4 divide-y">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</main>
	);
}

type PostWithMainImage = Prisma.PostGetPayload<{
	include: {
		mainImage: true;
	};
}>;

const PostCard = ({ post }: { post: PostWithMainImage }) => {
	return (
		<div className="flex justify-between pt-2">
			<div className="flex gap-2">
				<Image
					src={GetImageURL(post.mainImage?.key)}
					alt="Post image"
					width={100}
					height={100}
					className="rounded-lg"
				/>

				<div>
					<Link href={`/post/${post.id}`}>
						<h2 className="font-semibold hover:underline hover:underline-offset-2">
							{post.title}
						</h2>
					</Link>
					<p className="line-clamp-3 text-sm text-muted-foreground">
						{post.description}
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-between">
				<h2 className="font-semibold text-right">${post.price}</h2>
				<Link href={`/post/${post.id}`}>
					<Button size="sm">Visit</Button>
				</Link>
			</div>
		</div>
	);
};
