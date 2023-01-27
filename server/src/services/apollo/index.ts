import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import merge from 'lodash.merge'


import {resolve} from 'path';
import { readdir } from 'fs/promises';
import { fastify } from '../http';
import { readFileSync } from 'node:fs';


async function getResolvers() {
    const resolvers: any[] = [{}];
    const files = await readdir(resolve(__dirname, 'resolvers'));
    for (const file of files) {
        const resolver = await import(resolve(__dirname, 'resolvers', file));
        resolvers.push(resolver.default);
    }
    return merge(resolvers);
}

async function getTypeDefs() {
    const typeDefs = [];
    const files = await readdir(resolve(__dirname, 'typedefs'));
    for (const file of files) {
        const typeDef = resolve(__dirname, 'typedefs', file);
        typeDefs.push(typeDef);
    }
    return mergeTypeDefs(await loadFiles(typeDefs));
}

export const startApolloServer = async () => {
    const typeDefs = await getTypeDefs();
    const resolvers = await getResolvers();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins:[fastifyApolloDrainPlugin(fastify)]
    });

    await apolloServer.start();
    await fastify.register(fastifyApollo(apolloServer));
    
    console.log(`Apollo Server loaded in Fastify`);
};
