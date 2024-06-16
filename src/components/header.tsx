import { Menu, Search } from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signOut } from "@/lib/auth";

const Header = async () => {
	const session = await auth();
	const isLoggedIn = !!session?.user;
	return (
		<header className="w-full px-4 md:px-6 py-6 flex items-center justify-between border-b mb-6 gap-6">
			<Link href="/">
				<h1 className="font-semibold">Clips</h1>
			</Link>
			{/* <SearchInput /> */}
			<div className="flex items-center gap-4">
				{session?.user && (
					<Link href="/upload" className={cn(buttonVariants())}>
						Upload
					</Link>
				)}
				{session?.user ? <UserDropdown user={session.user} /> : <SignIn />}
				{/* <ThemeDropdown /> */}
			</div>
		</header>
	);
};

const SearchInput = () => {
	return (
		<>
			<div className="w-full flex-1 relative hidden md:flex">
				<Input type="text" placeholder="Search" className="" />
				<Button
					className="absolute right-0 top-0 h-full aspect-square"
					variant="ghost"
				>
					<Search className="size-4" />
				</Button>
			</div>
			<div className="block md:hidden">
				<Dialog>
					<DialogTrigger asChild>
						<Button size="icon" variant="outline">
							<Search size={18} />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Search</DialogTitle>
						</DialogHeader>
						<form className="flex flex-col gap-2">
							<Input type="text" placeholder="Search" className="w-full" />
							<div className="flex justify-end">
								<Button>Search</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

const UserDropdown = ({ user }: { user: Session["user"] }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost" className="rounded-full">
					<Avatar>
						<AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
						<AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-56 mx-4">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>My videos</DropdownMenuItem>
				<DropdownMenuItem>My statistics</DropdownMenuItem>
				<DropdownMenuSeparator />
				<SignOut>
					<button type="submit" className="w-full">
						<DropdownMenuItem className="w-full">Sign Out</DropdownMenuItem>
					</button>
				</SignOut>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Session, User } from "next-auth";
import Link from "next/link";

function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("discord");
			}}
		>
			<Button type="submit" className="w-full">
				Sign in
			</Button>
		</form>
	);
}

function SignOut({ children }: { children?: React.ReactNode }) {
	return (
		<form
			className="w-full"
			action={async () => {
				"use server";
				await signOut({
					redirectTo: "/",
				});
			}}
		>
			{children}
		</form>
	);
}

export default Header;
