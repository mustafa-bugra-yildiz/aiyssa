'use client'

import { databasesTable } from "@/db/schema"
import { useState } from "react"
import { addDatabase } from "./actions"
import Link from "next/link"

export default function DatabaseList({ databases }: { databases: typeof databasesTable.$inferSelect[] }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">Databases</h1>
			<div className="grid grid-cols-4 gap-4">
				{databases.map((database) => (
					<Link key={database.id} href={`/dashboard/database/${database.id}`}>
						<div className="w-20 aspect-square rounded-md flex items-center justify-center bg-gray-900 cursor-pointer">
							<p>{database.displayName}</p>
						</div>
					</Link>
				))}
			</div>


			{!isOpen && <button onClick={() => setIsOpen(true)}>Add</button>}
			{isOpen && <Form setIsOpen={setIsOpen} />}
		</div>
	)
}

function Form({
	setIsOpen,
}: {
	setIsOpen: (isOpen: boolean) => void
}) {
	const [error, setError] = useState<string | null>(null)
	const [name, setName] = useState('')
	const [connectionString, setConnectionString] = useState('')

	const handleAdd = async () => {
		const error = await addDatabase(name, connectionString)
		if (error) {
			setError(error)
		} else {
			setIsOpen(false)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)} />
			<input
				type="text"
				placeholder="Connection String"
				value={connectionString}
				onChange={(e) => setConnectionString(e.target.value)} />
			<div className="flex items-center justify-between gap-4 w-full">
				<button onClick={() => setIsOpen(false)}>Close</button>
				<button onClick={handleAdd}>Add</button>
			</div>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	)
}
