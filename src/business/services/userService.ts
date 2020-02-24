import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserRepository } from '../../domain/repositories/userRepository';
import User from '../../domain/entities/user';

export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly _userRepository: UserRepository,
  ) {
  }

  /**
   * Gets the list of all users
   */
  async getAll(): Promise<User[]> {
    const users = [new User('test@ob.com', '123', 'John', 'Smith')];
    this.logger.info(UserService.name, this.getAll.name, 'Received', users);
    return users;
    // return this.userRepository.find();
  }

  /**
   * Gets user by id
   * @param id
   */
  async get(id: string): Promise<User> {
    const user = id === '123' ? new User('test@ob.com', id, 'John', 'Smith') : null;
    this.logger.info(UserService.name, this.getAll.name, 'Received', user);
    return user;
    // return this.userRepository.find();
  }
}
