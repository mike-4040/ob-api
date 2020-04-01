import pino from 'pino';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';

const logger: Logger = new Logger(pino());

export class ControllerFactory {
  constructor(
    private connection, private readonly authConfig,
    private readonly userService, private readonly authService
  ) {
  }

  /**
   * Creates UserController instance.
   */
  createUserController(): UserController {
    return new UserController(logger, this.authConfig, this.userService);
  }

  /**
   * Creates AuthController instance.
   */
  createAuthController(): AuthController {
    return new AuthController(logger, this.authConfig, this.userService, this.authService);
  }
}
