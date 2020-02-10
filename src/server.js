// Todo: has to be improved.

import pino from 'pino';
import express from 'express';
import path from 'path';
import { Logger } from './infrastructure/adapters/logger/logger';

const logger = new Logger(pino);

const app = express();
const port = process.env.PORT || 3001;

app.get('/api', (req, res) => res.send('New API!'));

// Todo replace console on logger
app.listen(port, () => logger.info('server', 'initialize', `Example app listening on port ${port}!`));
