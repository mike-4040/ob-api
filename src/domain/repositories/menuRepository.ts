import { EntityRepository } from 'typeorm';
import { BaseRepository } from './baseRepository';
import Menu from '../entities/menu';

@EntityRepository(Menu)
export class MenuRepository extends BaseRepository<Menu> {

}
