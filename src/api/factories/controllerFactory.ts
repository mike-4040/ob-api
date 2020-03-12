import pino from 'pino';
import { UserRepository } from '../../domain/repositories/userRepository';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserService } from '../../business/services/userService';
import { UserController } from '../controllers/userController';

const logger = new Logger(pino());

export class ControllerFactory {
  constructor(private connection) {
  }

  /**
   * Creates UserController instance.
   */
  async createUserController(): Promise<UserController> {
    const userRepository = this.connection.getCustomRepository(UserRepository);

    // User API initialization
    const userService = new UserService(logger, userRepository);
    return new UserController(logger, userService);
  }
}
