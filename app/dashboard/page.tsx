import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
	const user = (await currentUser())!

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1 className="text-4xl font-bold">AIyssa</h1>
			<p className="text-lg text-gray-500">Your Personal Data Assistant</p>
			<p>{user?.fullName}</p>
		</div>
	);
}
