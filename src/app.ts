import pino from 'pino';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Logger } from './infrastructure/adapters/logger/logger';
import { createUserRouter } from './api/routes/userRoute';
import { createErrorHandlerMiddleware } from './api/factories/errorHandlerMiddlewareFactory';
import { authMiddleware } from './api/middlewares/authMiddleware';
import { ControllerFactory } from './api/factories/controllerFactory';
import { DbConnectionFactory } from './domain/factories/dbConnectionFactory';
import User from './domain/entities/user';

const logger = new Logger(pino());
const handleError = createErrorHandlerMiddleware(logger);

(async () => {
  const dbConnectionFactory = new DbConnectionFactory({ type: 'mysql', url: process.env.DATABASE_URL }, logger);

  const connection = await dbConnectionFactory.create([User]);

  const controllerFactory = new ControllerFactory(connection);
  const userController = await controllerFactory.createUserController();

  // User API initialization
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
})();
