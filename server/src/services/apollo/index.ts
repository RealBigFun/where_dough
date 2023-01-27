import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';


import {resolve} from 'path';
import { readdir } from 'fs/promises';
import { fastify } from '../http';
import { readFileSync } from 'node:fs';


async function getResolvers() {
    const resolvers = [];
    const files = await readdir(resolve(__dirname, 'resolvers'));
    for (const file of files) {
        const resolver = await import(resolve(__dirname, 'resolvers', file));
        resolvers.push(resolver);
    }
    return resolvers;
}

async function getTypeDefs() {
    const typeDefs = [];
    const files = await readdir(resolve(__dirname, 'typeDefs'));
    for (const file of files) {
        const typeDef = readFileSync(resolve(__dirname, 'typeDefs', file),{ encoding: 'utf-8' });
        typeDefs.push(typeDef);
    }
    return typeDefs;
}

export const startApolloServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs:  mergeTypeDefs(await loadFiles(resolve(__dirname, 'typeDefs/**/*.graphql'))),
        resolvers: await getResolvers(),
        plugins:[fastifyApolloDrainPlugin(fastify)]
    });

    await apolloServer.start();
    await fastify.register(fastifyApollo(apolloServer));
    
    console.log(`Apollo Server loaded in Fastify`);
};
