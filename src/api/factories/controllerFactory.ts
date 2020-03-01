import pino from 'pino';
import { dbConfig } from '../../config/typeorm';
import User from '../../domain/entities/user';
import { DbConnectionFactory } from '../../domain/factories/dbConnectionFactory';
import { UserRepository } from '../../domain/repositories/userRepository';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserService } from '../../business/services/userService';
import { UserController } from '../controllers/userController';

const logger = new Logger(pino());

export class ControllerFactory {
  private entities = [User];

  private connection;

  private dbConnectionFactory = new DbConnectionFactory(dbConfig, logger);

  async createUserController(): Promise<UserController> {
    // Database initialization
    // Check connection: was it expired or not
    // if expired - reconnect
    // if not and already exist - reuse
    // if not exist - create new
    const connection = this.connection && this.connection.isConnected()
      ? this.connection.connect()
      : await this.dbConnectionFactory.create(this.entities);
    const userRepository = connection.getCustomRepository(UserRepository);

    // User API initialization
    const userService = new UserService(logger, userRepository);
    return new UserController(logger, userService);
  }
}
