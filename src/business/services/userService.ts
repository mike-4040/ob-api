import { DeleteResult } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserRepository } from '../../domain/repositories/userRepository';
import User from '../../domain/entities/user';
import { UserInterface } from '../../api/interfaces/userInterface';
import { UserModel } from '../../domain/models/userModel';
import { Exception } from '../../api/decorators/exceptionDecorator';

export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly authConfig,
    private readonly userRepository: UserRepository
  ) {
  }

  /**
   * Gets the list of all users
   */
  @Exception()
  async getAll(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserModel(user.email, user.id, user.firstName, user.lastName, user.organization));
  }

  /**
   * Gets user by email
   * @param id
   */
  @Exception()
  async get(id: string): Promise<UserModel|null> {
    const user = await this.userRepository.findOne(id);

    this.logger.info(UserService.name, this.get.name, 'Received', user);
    return user ? new UserModel(user.email, user.id, user.firstName, user.lastName, user.organization) : null;
  }

  async getWholeModel(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  /**
   * Gets user by email
   * @param email
   */
  @Exception()
  async getByName(email: string): Promise<UserModel|null> {
    const user = await this.userRepository.findOne({ email });

    this.logger.info(UserService.name, this.get.name, 'Received', user);
    return user ? new UserModel(user.email, user.id, user.firstName, user.lastName, user.organization) : null;
  }

  /**
   * Creates new user
   * @param model
   */
  @Exception()
  async create(model: UserInterface): Promise<UserModel> {
    const date = new Date();

    const password = await bcrypt.hash(model.password, this.authConfig.saltLength);

    const user = new User(model.email, password, undefined, model.firstName, model.lastName, date, date, model.organization);

    const result = await this.userRepository.save(user);

    this.logger.info(UserService.name, this.getAll.name, 'Received', result);
    return new UserModel(result.email, result.id, result.firstName, result.lastName, result.organization);
  }


  /**
   * Updates user by id
   * @param id
   * @param model
   */
  @Exception()
  async update(id: string, model: UserInterface): Promise<UserModel> {
    const password = await bcrypt.hash(model.password, 8);
    const newUser = new User(undefined, id, password, model.firstName, model.lastName, undefined, new Date(), model.organization);

    await this.userRepository.save(newUser);
    const user = await this.userRepository.findOne(model.id);

    this.logger.info(UserService.name, this.getAll.name, 'Updated user', user);
    return new UserModel(user.email, user.id, user.firstName, user.lastName, user.organization);
  }

  /**
   * Deletes user by id
   * @param id
   */
  @Exception()
  async delete(id: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.userRepository.delete(id);

    this.logger.info(UserService.name, this.getAll.name, 'Deleted', result);
    return result;
  }
}
