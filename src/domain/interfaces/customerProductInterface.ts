/**
 * ServiceInterface
 */
export interface ServiceInterface<T> {
  getOne(): Promise<T>
  getAll(): Promise<T[]>
}
