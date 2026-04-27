import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

// User table
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    tier: text("tier").default("free"), //free / pro
    createdAt: timestamp("created_at").defaultNow(),
});

// Tasks table
export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    name: text("name").notNull(),
    isDone: boolean("is_done").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
