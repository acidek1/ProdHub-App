export async function requireAuth(request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.status(401).send({ error: "Login in to get access" });
    }
}