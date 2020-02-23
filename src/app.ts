import pino from 'pino';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { EntityManager, EntityMetadata } from 'typeorm';
import { Logger } from './infrastructure/adapters/logger/logger';
import { createUserRouter } from './api/routes/userRoute';
import { UserController } from './api/controllers/userController';
import { UserService } from './business/services/userService';
import { UserRepository } from './domain/repositories/userRepository';
import { handleError } from './api/middlewares/errorHandler';

const logger = new Logger(pino());

// User API initialization
const userRepository = new UserRepository({ connection: {} } as EntityManager, {} as EntityMetadata);
const userService = new UserService(logger, userRepository);
const userController = new UserController(logger, userService);
const userRouter = createUserRouter(express, userController);

// Express app initialization
const app = express();
const port = process.env.PORT || 3001;

// Http server middlewares initialization
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routing binding
app.use('/', userRouter);
app.use((err, req, res, next) => {
  handleError(err, res, next);
});


app.listen(port, () => logger.info('server', 'initialize', `Example app listening on port ${port}!`));
