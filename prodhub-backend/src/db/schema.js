import { integer } from "drizzle-orm/gel-core";
import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

// User table
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    displayName: text("displayName"),
    tier: text("tier").default("free"), //free / pro
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Tasks table
export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    name: text("name").notNull(),
    isDone: boolean("is_done").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

// Habits table
export const habits = pgTable("habits", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    name: text("name").notNull(),
    isDoneToday:
    boolean("is_done_today").default(false),
    streak: integer("streak").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Notes table
export const notes = pgTable("habits", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});