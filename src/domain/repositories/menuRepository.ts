import { EntityRepository } from 'typeorm';
import { BaseRepository } from './baseRepository';
import User from '../entities/user';

@EntityRepository(MenuRepository)
export class MenuRepository extends BaseRepository<MenuRepository> {

}
