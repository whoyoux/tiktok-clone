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
		<div className="feed-card flex flex-col gap-4 divide-y px-4 snap-y overflow-y-auto snap-mandatory h-[calc(100dvh-120px)] ">
			{posts.map((post) => (
				<FeedCard key={post.id} post={post} />
			))}
		</div>
	);
};

const FeedCard = ({ post }: { post: PostWithVideoAndUser }) => {
	const { ref, inView } = useInView();
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
			className="flex flex-col justify-between gap-2 pt-4 snap-start max-w-screen-sm mx-auto"
			ref={ref}
		>
			<div className="relative w-full aspect-[9/16]">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					src={GetVideoURL(post.video.key)}
					className="rounded-lg object-contain"
					controls
					ref={videoRef}
				/>
			</div>

			<div className="flex gap-2">
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
