import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserService } from '../../business/services/userService';
import User from '../../domain/entities/user';

export class UserController {
  constructor(private readonly logger: Logger, private readonly userService: UserService) {
  }

  async get(req, res, next) {
    try {
      const user: User = await this.userService.get(req.params.id);

      this.logger.info(UserController.name, this.get.name, req);
      res.send(user);
      next();
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const users: User[] = await this.userService.getAll();

      this.logger.info(UserController.name, this.get.name, req);
      res.send(users);
      next();
    } catch (error) {
      next(error);
    }
  }
}
