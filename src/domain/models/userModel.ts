/**
 * UserInterface for API User model.
 * This is a contract between UI and API.
 */
export class UserModel {
  constructor(private email: string, private id?: string, private firstName?: string, private lastName?: string, private organization?: string) {
  }
}
