import Feed from "@/components/feed";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const posts = await prisma.post.findMany({
		include: {
			video: true,
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});
	return (
		<main className="">
			<Feed posts={posts} />
		</main>
	);
}
