import CreateVideo from "@/components/create-video-form";
import { ensureAuth } from "@/lib/utils";

const CreateVideoPage = async () => {
	await ensureAuth();
	return (
		<main className="max-w-screen-md mx-auto">
			<CreateVideo />
		</main>
	);
};

export default CreateVideoPage;
