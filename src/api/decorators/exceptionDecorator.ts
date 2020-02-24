/**
 * Exception decorator for error catching and logging.
 */
export const Exception = (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const method = descriptor.value;
  // const className = target.constructor.name;

  // eslint-disable-next-line no-param-reassign,consistent-return,func-names
  descriptor.value = function (this: any, ...args: any[]): void {
    const next = args[2];

    try {
      return method.apply(this, args);
    } catch (err) {
      next(err);
    }
  };

  return descriptor;
};
