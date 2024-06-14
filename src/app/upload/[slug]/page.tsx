import { prisma } from "@/lib/prisma";
import { GetImageURL } from "@/lib/r2";
import { notFound } from "next/navigation";

type PostPageProps = {
	params: {
		slug: string;
	};
};
const PostPage = async ({ params }: PostPageProps) => {
	const post = await prisma.post.findUnique({
		where: {
			id: params.slug,
		},
		include: {
			mainImage: true,
		},
	});

	const mainImageUrl = GetImageURL(post?.mainImage?.key ?? "");

	if (!post) return notFound();

	return (
		<div>
			PostPage {params.slug}{" "}
			<img src={mainImageUrl ?? ""} alt="" width={256} height={256} />
		</div>
	);
};

export default PostPage;
