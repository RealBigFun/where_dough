import Fastify from "fastify";

export const fastify = Fastify();

export const startFastify = async () => {
    await fastify.listen({ port: 3000 });
    const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening on http://localhost:${port}`);
}