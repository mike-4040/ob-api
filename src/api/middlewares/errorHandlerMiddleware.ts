import { Logger } from '../../infrastructure/adapters/logger/logger';

export const handleError = ({ logger }: { logger: Logger}, err, req, res, next) => {
  const { statusCode = 503, message } = err;

  logger.error('Middleware', 'ErrorHandler', err);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
  next(err);
};
