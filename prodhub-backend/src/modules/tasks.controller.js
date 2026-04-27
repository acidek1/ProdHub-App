import { tasksService } from "./tasks.service.js";

export const tasksController = {

    async getTasksHandler(request, reply) {
        const allTasks = await tasksService.getAllTasks();
        return reply.send(allTasks);
    },
    
    async createTaskHandler(request, reply) {
        const { name } = request.body;

        const newTask = await tasksService.createTask(name);
        return reply.status(201).send(newTask);
    },

    async deleteTaskHandler(request, reply) {
        const { id } = request.params;

        await tasksService.deleteTask(id);
        return reply.send({ success: true, message: "Task deleted." });
    }
};