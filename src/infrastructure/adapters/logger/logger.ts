/**
 * Logger class.
 * Abstraction for logger library.
 */
export class Logger {
  constructor(private readonly pino) {
  }

  info(className: string, methodName: string, message: string, data?: object) {
    this.pino.info(`[${className}:${methodName}] ${message}`, data);
  }

  warn(className: string, methodName: string, message: Error | string) {
    this.pino.warn(`[${className}:${methodName}] ${message}`);
  }

  error(className: string, methodName: string, message: Error | string) {
    this.pino.error(`[${className}:${methodName}] ${message}`);
  }
}
