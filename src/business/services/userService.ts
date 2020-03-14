import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserRepository } from '../../domain/repositories/userRepository';
import User from '../../domain/entities/user';
import { UserInterface } from '../../api/interfaces/userInterface';

export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository
  ) {
  }

  /**
   * Gets the list of all users
   */
  async getAll(): Promise<User[]> {
    // const users = [new User('test@ob.com', '123', 'John', 'Smith')];
    // this.logger.info(UserService.name, this.getAll.name, 'Received', users);
    return this.userRepository.find();
  }

  /**
   * Gets user by email
   * @param email
   */
  async get(email: string): Promise<User> {
    const user = await this.userRepository.findOne(email);
    this.logger.info(UserService.name, this.getAll.name, 'Received', user);
    return user;
  }

  }
}
