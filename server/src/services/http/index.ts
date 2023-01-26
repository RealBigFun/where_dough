import Fastify from "fastify";
import cors from '@fastify/cors'

export const fastify = Fastify({logger: true});

export const startFastify = async () => {
    await fastify.register(cors, { 
        // put your options here
      })
    await fastify.listen({ 
        port: 3000,
    });
    const address = fastify.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening on http://localhost:${port}`);
}