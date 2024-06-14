import CreateVideo from "@/components/create-video-form";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

const CreateVideoPage = async () => {
	const session = await auth();
	if (!session?.user) return notFound();
	return (
		<main className="max-w-screen-md mx-auto">
			<CreateVideo />
		</main>
	);
};

export default CreateVideoPage;
