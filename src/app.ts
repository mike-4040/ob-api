import pino from 'pino';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { Logger } from './infrastructure/adapters/logger/logger';
import { createUserRouter } from './api/routes/userRoute';
import { createAuthRouter } from './api/routes/authRoute';
import { createErrorHandlerMiddleware } from './api/factories/errorHandlerMiddlewareFactory';
import { createAuthMiddleware } from './api/middlewares/authMiddleware';
import { ControllerFactory } from './api/factories/controllerFactory';
import { DbConnectionFactory } from './domain/factories/dbConnectionFactory';
import User from './domain/entities/user';
import { dbConfig } from './config/typeorm';
import { authConfig } from './config/auth';
import { UserRepository } from './domain/repositories/userRepository';
import { UserService } from './business/services/userService';
import { AuthService } from './infrastructure/service/authService';

dotEnvConfig();

const logger = new Logger(pino());
const handleError = createErrorHandlerMiddleware(logger);

(async () => {
  const dbConnectionFactory = new DbConnectionFactory(dbConfig, logger);

  const connection = await dbConnectionFactory.create([User]);

  // User API initialization
  const userService = new UserService(logger, authConfig, connection.getCustomRepository(UserRepository));
  const authService = new AuthService(logger, authConfig);

  const controllerFactory = new ControllerFactory(connection, authConfig, userService, authService);
  const userController = await controllerFactory.createUserController();
  const authController = await controllerFactory.createAuthController();

  // User API initialization
  const authMiddleware = createAuthMiddleware(authService);

  const userRouter = createUserRouter(express, userController);
  const authRouter = createAuthRouter(express, authController);

  // Express app initialization
  const app = express();
  const port = process.env.PORT || 3001;

  // Http server middlewares initialization
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  userRouter.use(authMiddleware);

  // Routing binding
  app.use('/', authRouter);
  app.use('/', userRouter);

  // Error handling
  app.use(handleError);

  app.listen(port, () => logger.info('server', 'initialize', `Office branch API has started on port: ${port}!`));
})();
