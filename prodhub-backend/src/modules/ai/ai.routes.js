import { aiController } from "./ai.controller.js";

const chatSchema = {
    body: {
        type: "object",
        required: ["message"],
        properties: {
            message: {
                type:"string",
                minLength: 1,
            },
        },
    },
};

export async function aiRoutes(fastify) {
    fastify.post("/chat", { schema: chatSchema }, aiController.chatHandler);
}