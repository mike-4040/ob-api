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
import { createErrorHandlerMiddleware } from './api/factories/errorHandlerMiddlewareFactory';
import { authMiddleware } from './api/middlewares/authMiddleware';

const logger = new Logger(pino());
const handleError = createErrorHandlerMiddleware(logger);

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
app.use(authMiddleware);
app.use(cors());

// Routing binding
app.use('/', userRouter);

// Error handling
app.use(handleError);

app.listen(port, () => logger.info('server', 'initialize', `Office branch API has started on port: ${port}!`));
