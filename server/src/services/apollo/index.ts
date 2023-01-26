import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { fastify } from '../http';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const bookTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
`;

const queryTypeDefs = `#graphql
    # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
    typeDefs: [bookTypeDefs, queryTypeDefs],
    resolvers,
    plugins:[fastifyApolloDrainPlugin(fastify)]
});

export const startApolloServer = async () => {
    await apolloServer.start();
    await fastify.register(fastifyApollo(apolloServer));
    
    console.log(`Apollo Server loaded in Fastify`);
};
