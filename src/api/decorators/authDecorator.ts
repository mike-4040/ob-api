/**
 * Exception decorator for error catching and logging.
 */
import { Roles } from '../../config/roles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Auth = (role: Roles): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const method = descriptor.value;

  // eslint-disable-next-line no-param-reassign,consistent-return,func-names,@typescript-eslint/no-unused-vars
  descriptor.value = function (this: any, ...args: any[]): void {
    // Todo get user role from DB and verify
    // Commented for now. Will be in the next PR with Roles
    // if (context.role !== role) {
    //   throw new Error('User is not authorized to perform this action');
    // }

    method.apply(this, args);
  };

  return descriptor;
};
