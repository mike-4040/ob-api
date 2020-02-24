import { Logger } from '../../infrastructure/adapters/logger/logger';
import { handleError } from '../middlewares/errorHandlerMiddleware';

export const createErrorHandlerMiddleware = (logger: Logger) => handleError.bind(null, { logger });
