import { sign, verify } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Logger } from '../adapters/logger/logger';
import User from '../../domain/entities/user';
import { Exception } from '../../api/decorators/exceptionDecorator';

export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly config
  ) {
  }

  @Exception()
  async signIn(user: User) {
    return sign({ username: user.email }, this.config.secret, { expiresIn: this.config.expiration });
  }

  @Exception()
  async verify(user: User, password) {
    if (!password || !user.email) {
      return null;
    }

    // compare password
    const result = await bcrypt.compare(password, user.password);
    return result;
  }

  async verifyExpiration(token) {
    const payload = verify(token, this.config.secret);

    const now = Math.round(Number(new Date()) / 1000);
    return payload.exp - now > this.config.expiration;
  }
}
