"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.fastify = void 0;
// Require the framework and instantiate it
const fastify_1 = __importDefault(require("fastify"));
exports.fastify = (0, fastify_1.default)({ logger: true });
// Declare a route
exports.fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});
// Run the server!
const start = async () => {
    try {
        await exports.fastify.listen({ port: 3000 });
    }
    catch (err) {
        exports.fastify.log.error(err);
        process.exit(1);
    }
};
exports.start = start;
