import express from 'express';
import cors from 'cors';

import accountsRouter from './routers/AccountsRouter';

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/accounts', accountsRouter);

export default server;