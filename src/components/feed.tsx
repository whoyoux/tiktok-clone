"use client";
import { GetVideoURL } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

type PostWithVideoAndUser = Prisma.PostGetPayload<{
	include: {
		video: true;
		user: {
			select: {
				name: true;
				image: true;
			};
		};
	};
}>;

const Feed = ({ posts }: { posts: PostWithVideoAndUser[] }) => {
	return (
		<div className="flex flex-col items-center gap-4 snap-y overflow-y-auto snap-mandatory h-[calc(100dvh-120px)] no-scrollbar">
			{posts.map((post) => (
				<FeedCard key={post.id} post={post} />
			))}
		</div>
	);
};

const FeedCard = ({ post }: { post: PostWithVideoAndUser }) => {
	const { ref, inView } = useInView({
		threshold: 0.7,
	});
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (inView) {
			videoRef.current?.play();
		} else {
			videoRef.current?.pause();
		}
	});

	return (
		<div
			className="flex flex-col justify-between gap-2 pt-4 snap-start max-w-screen-sm"
			ref={ref}
		>
			<div className="w-full">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					src={GetVideoURL(post.video.key)}
					className="rounded-lg w-full aspect-[9/14] object-cover bg-muted"
					controls
					ref={videoRef}
				/>
			</div>

			<div className="flex gap-2 w-full">
				<div>
					<img
						src={post?.user?.image ?? ""}
						alt="user profile"
						className="w-8 h-8 rounded-full"
					/>
				</div>
				<div className="flex-1">
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
		</div>
	);
};

export default Feed;
