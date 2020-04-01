import { sign } from 'jsonwebtoken';
import { Exception } from '../decorators/exceptionDecorator';
import { Logger } from '../../infrastructure/adapters/logger/logger';
import User from '../../domain/entities/user';
import { UserService } from '../../business/services/userService';
import { AuthService } from '../../infrastructure/service/authService';

export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly config,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
  }

  @Exception()
  async token(req, res, next) {
    const token = sign({ username: req.body.user.email }, this.config.secret, { expiresIn: this.config.expiration });
    res.send(token);
    next();
  }

  @Exception()
  async login(req, res, next) {
    const user: User = await this.userService.getWholeModel(req.body.user.email);

    if (!user) {
      return res.status(401).end();
    }

    const verificationResult = await this.authService.verify(user, req.body.user.password);
    if (!verificationResult) {
      return res.status(401).end();
    }

    const token = await this.authService.signIn(user);
    res.set('Authorization', token);
    res.send({ token });
    next();
  }
}
