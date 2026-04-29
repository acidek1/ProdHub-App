import { aiService } from "./ai.service.js";

export const aiController = {
    async chatHandler(request, reply) {
        try {
            const { message } = request.body;

            const replyText = await aiService.chat(message);

            return reply.send({
                reply: replyText,
            });
        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({
                error: "AI chat failed.",
            });
        }
    },
};