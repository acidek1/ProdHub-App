import { authService } from "./auth.service.js";

export const authController = {
    async registerHandler(request, reply) {
        const { email, password } = request.body;
        const user = await authService.register(email, password);
        return reply.status(201).send({ message:"Registered Correctly!", userId: user.id});
    },
    
    async loginHandler(request, reply) {
        const { email, password } = request.body;
        const user = await authService.validateUser(email, password);

        if (!user) {
            return reply.status(401).send({ error: "Incorrect Email or password." });
          }

          const token = await reply.jwtSign({ id: user.id, email: user.email, tier: user.tier });

          return { token };

    }
}