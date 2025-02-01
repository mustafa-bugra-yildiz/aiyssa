import { db } from "@/db";
import { databasesTable } from "@/db/schema";
import { currentUser, User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import DatabaseList from "./database-list";

export default async function Dashboard() {
	const user = (await currentUser())!

	const databases = await db
		.select()
		.from(databasesTable)
		.where(eq(databasesTable.ownerId, user.id))

	return (
		<div className="flex items-center justify-evenly w-dvw h-dvh">
			<Banner user={user} />
			<DatabaseList databases={databases} />
		</div>
	);
}

function Banner({ user }: { user: User }) {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">AIyssa</h1>
			<p className="text-lg text-gray-500">Your Personal Data Assistant</p>
			<p>{user?.fullName}</p>
		</div>
	)
}
