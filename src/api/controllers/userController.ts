import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserService } from '../../business/services/userService';
import User from '../../domain/entities/user';
import { Roles } from '../../config/roles';
import { Auth } from '../decorators/authDecorator';
import { Exception } from '../decorators/exceptionDecorator';

export class UserController {
  constructor(private readonly logger: Logger, private readonly userService: UserService) {
  }

  @Auth(Roles.Vendor)
  @Exception()
  async get(req, res, next) {
    const user: User = await this.userService.get(req.params.id);

    this.logger.info(UserController.name, this.get.name, req);
    res.send(user);
    next();
  }

  @Auth(Roles.Vendor)
  @Exception()
  async getAll(req, res, next) {
    const users: User[] = await this.userService.getAll();

    this.logger.info(UserController.name, this.get.name, req);
    res.send(users);
    next();
  }
}
