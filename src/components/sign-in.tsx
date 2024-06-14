import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("discord");
			}}
		>
			<Button type="submit">Signin with Discord</Button>
		</form>
	);
}
