import { EntityRepository } from 'typeorm';
import { BaseRepository } from './baseRepository';
import User from '../entities/user';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {

}
