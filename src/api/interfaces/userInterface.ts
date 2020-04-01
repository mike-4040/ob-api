/**
 * UserInterface for API User model.
 * This is a contract between UI and API.
 */
export interface UserInterface {
  email: string,
  password: string,
  id?: string,
  firstName?: string,
  lastName?: string,
  organization?: string
}
