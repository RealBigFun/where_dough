import { startApolloServer } from './services/apollo'
import { startFastify } from './services/http';

async function main() {
    await startApolloServer();
    await startFastify();
}

main();
