import { startApolloServer } from './services/apollo'
import { startFastify } from './services/http';

startApolloServer();
startFastify();