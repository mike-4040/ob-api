/**
 * Exception decorator for error catching and logging.
 */
import { Roles } from '../../config/roles';

export const Auth = (role: Roles): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const method = descriptor.value;

  // eslint-disable-next-line no-param-reassign,consistent-return,func-names,@typescript-eslint/no-unused-vars
  descriptor.value = function (this: any, ...args: any[]): void {
    const { context } = args[0];

    if (context.role !== role) {
      throw new Error('User is not authorized to perform this action');
    }

    method.apply(this, args);
  };

  return descriptor;
};
