import { authController } from "./auth.controller.js";

export async function authRoutes(fastify) {
    fastify.post("/register", authController.registerHandler);
    fastify.post("/login", authController.loginHandler);
}
