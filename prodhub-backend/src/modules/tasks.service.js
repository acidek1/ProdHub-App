import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";

//class
export const tasksService = {
    async getAllTasks() {
        return await db.select().from(tasks);
    },
    async createTask(name) {
        const [newTask] = await db.insert(tasks).values({ name }).returning();
        return newTask;
    },

    async deleteTask(id) {
        await db.delete(tasks).where(eq(tasks.id, id));
        return true;
    }
};