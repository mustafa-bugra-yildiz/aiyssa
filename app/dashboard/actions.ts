'use server'

import { db } from "@/db"
import { databasesTable } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import postgres from 'postgres'

export const addDatabase = async (name: string, connectionString: string): Promise<string | null> => {
	const user = await currentUser()
	if (!user) {
		return 'User not found'
	}

	// Try connecting to the database
	try {
		const sql = postgres(connectionString)
		const schema = await sql`SELECT schema_name FROM information_schema.schemata`
		console.log(schema)
		await sql.end()
	} catch (error) {
		if (error instanceof Error) {
			return 'Failed to connect to the database: ' + error.message
		}
		return 'Failed to connect to the database'
	}

	await db.insert(databasesTable).values({
		ownerId: user.id,
		displayName: name,
		connectionString: connectionString,
	})

	revalidatePath('/dashboard')
	return null
}
