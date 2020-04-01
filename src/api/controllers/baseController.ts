import { Logger } from '../../infrastructure/adapters/logger/logger';

export class BaseController {
  constructor(
    private readonly logger: Logger
  ) {
  }
}
