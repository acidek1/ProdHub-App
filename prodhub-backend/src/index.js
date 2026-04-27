import "dotenv/config";
import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { tasksRoutes } from "./modules/tasks.routes.js";

const fastify = Fastify({ logger: true});

// Register CORS
fastify.register(cors, {
    origin: true
});

// Register JWT
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
});

// Register Modules
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(tasksRoutes, { prefix: "/api/tasks" });

// Basic test endpoint
fastify.get("/ping", async() => {
    return { status: "ok", msg: "Prodhub API is alive"};
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log(" Server is working here: http://localhost:3000")
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();