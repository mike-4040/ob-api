import { DeleteResult } from 'typeorm';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserService } from '../../business/services/userService';
import { Roles } from '../../config/roles';
import { Auth } from '../decorators/authDecorator';
import { Exception } from '../decorators/exceptionDecorator';
import { UserModel } from '../../domain/models/userModel';

export class UserController {
  constructor(private readonly logger: Logger, private readonly config, private readonly userService: UserService) {
  }

  /**
   * Temporary action for now (development phase)
   * @param req
   * @param res
   * @param next
   */
  @Auth(Roles.Vendor)
  @Exception()
  async getByName(req, res, next) {
    const user: UserModel = await this.userService.get(req.body.username);

    this.logger.info(UserController.name, this.get.name, req);
    res.send(user);
    next();
  }

  /**
   * Main get action
   * @param req
   * @param res
   * @param next
   */
  @Auth(Roles.Vendor)
  @Exception()
  async get(req, res, next) {
    const user: UserModel = await this.userService.get(req.params.id);

    this.logger.info(UserController.name, this.get.name, req);

    if (user) {
      res.send(user);
    } else {
      res.status(404);
      res.send({
        message: `No such user ${req.params.id} in the system`
      });
    }
    next();
  }

  @Auth(Roles.Vendor)
  @Exception()
  async getAll(req, res, next) {
    const users: UserModel[] = await this.userService.getAll();

    this.logger.info(UserController.name, this.get.name, req);
    res.send(users);
    next();
  }

  @Auth(Roles.Vendor)
  @Exception()
  async create(req, res, next) {
    if (await this.userService.getByName(req.body.user.email)) {
      res.status(404);
      res.send({
        message: `Such user ${req.body.user.email} already exists in the system`
      });
      return;
    }

    const user: UserModel = await this.userService.create(req.body.user);

    this.logger.info(UserController.name, this.get.name, 'Created user', user);
    res.send(user);
    next();
  }

  @Auth(Roles.Vendor)
  @Exception()
  async update(req, res, next) {
    const user: UserModel = await this.userService.update(req.params.id, req.body.user);

    this.logger.info(UserController.name, this.get.name, 'Created user', user);
    res.send(user);
    next();
  }

  @Auth(Roles.Vendor)
  @Exception()
  async delete(req, res, next) {
    const result: DeleteResult = await this.userService.delete(req.params.id);
    if (result.affected) {
      res.send({
        message: `Successfully deleted user ${req.params.id}`,
        count: result.affected
      });
    } else {
      res.send({
        message: `No such user ${req.params.id} in the system`,
        count: result.affected
      });
    }
    next();
  }
}
