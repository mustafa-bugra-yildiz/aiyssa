import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const databasesTable = pgTable("databases", {
	id: uuid().primaryKey().defaultRandom(),
	ownerId: varchar({ length: 255 }).notNull(),
	displayName: varchar({ length: 255 }).notNull(),
	connectionString: varchar({ length: 255 }).notNull(),
});
