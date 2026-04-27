import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authService = {
    async register(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db.insert(users). values({
            email,
            password: hashedPassword
        }).returning();
        return newUser;
    },

    async validateUser(email, password) {
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return user;
    }
};