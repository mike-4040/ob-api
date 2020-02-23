import { Logger } from '../../infrastructure/adapters/logger/logger';
import { UserRepository } from '../repositories/userRepository';

export class ValidationService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {
  }
}
