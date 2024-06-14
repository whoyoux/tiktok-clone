import { ensureAuth } from "@/lib/utils";
import React from "react";

const MyVideosPage = async () => {
	const session = await ensureAuth();
	return <div>MyVideosPage</div>;
};

export default MyVideosPage;
