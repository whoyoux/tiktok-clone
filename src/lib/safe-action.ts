import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const action = createSafeActionClient();

export class NotAuthenticatedError extends Error {}

export const authAction = createSafeActionClient({
    async middleware() {
        const session = await auth();
        if (!session?.user) {
            throw new NotAuthenticatedError(
                "User is not authenticated. Please log in."
            );
        }

        return {
            session,
        };
    },
    handleReturnedServerError(e) {
        if (e instanceof NotAuthenticatedError) {
            return e.message;
        }
        return DEFAULT_SERVER_ERROR;
    },
});
