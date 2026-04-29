import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authService = {
    async register(email, password) {
        const existingUser = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));
        
        if (existingUser.length > 0) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db
        .insert(users)
        .values({
            email,
            password: hashedPassword,
        })
        .returning({
            id: users.id,
            email: users.email,
            displayName: users.displayName,
            tier: users.tier,
            isActive: users.isActive,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        });

        return newUser;
    
    },

    async validateUser(email, password) {
        const [user] = await db
        .select({
            id: users.id,
            email: users.email,
            password: users.password,
            displayName: users.displayName,
            tier: users.tier,
            isActive: users.isActive,
        })
        .from(users)
        .where(eq(users.email, email));

        if (!user) return null;
        if (user.isActive === false) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            tier: user.tier,
            isActive: user.isActive,
        };
    },
};