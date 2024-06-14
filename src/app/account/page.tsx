import Feed from "@/components/feed";
import { prisma } from "@/lib/prisma";
import { ensureAuth } from "@/lib/utils";
import type { Session } from "next-auth";
import Image from "next/image";
import React from "react";

const MyAccountPage = async () => {
	const session = await ensureAuth();
	const postsGroup = await prisma.post.groupBy({
		by: ["userId"],
		_sum: {
			views: true,
		},
		where: {
			userId: session.user.id,
		},
	});

	const userVideos = await prisma.post.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			video: true,
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const totalViews = postsGroup[0]._sum.views;
	return (
		<div className="flex flex-col max-w-screen-sm w-full mx-auto px-4">
			<UserCard user={session.user} totalViews={Number(totalViews)} />
			<Feed posts={userVideos} />
		</div>
	);
};

const UserCard = ({
	user,
	totalViews,
}: { user: Session["user"]; totalViews: number }) => {
	return (
		<div className="w-full border rounded-lg p-4 flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Image
					src={user.image ?? ""}
					alt={user.name ?? ""}
					width={50}
					height={50}
					className="rounded-full"
				/>
				<h1 className="font-xl font-semibold">{user.name}</h1>
			</div>
			<div>
				<h2>
					Total views: <span className="font-semibold">{totalViews}</span>
				</h2>
			</div>
		</div>
	);
};

export default MyAccountPage;
