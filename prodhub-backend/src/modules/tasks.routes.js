import { tasksController } from "./tasks.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const createTaskSchema = {
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: { type: "string", minLength: 1, maxLength: 255 }
        }
    }
};

const deleteTaskSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" }
        }
    }
};

export async function tasksRoutes(fastify, options) {

    //AUTHORIZE
    fastify.addHook("onRequest", requireAuth);

    //GET
    fastify.get("/", tasksController.getTasksHandler);

    //POST
    fastify.post("/", { schema: createTaskSchema }, tasksController.createTaskHandler);

    //DELETE
    fastify.delete("/:id", { schema: deleteTaskSchema }, tasksController.deleteTaskHandler);

}
