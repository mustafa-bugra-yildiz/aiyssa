import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await currentUser()
	if (user) {
		redirect("/dashboard")
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1 className="text-4xl font-bold">AIyssa</h1>
			<p className="text-lg text-gray-500">Your Personal Data Assistant</p>
			<SignInButton />
		</div>
	);
}

