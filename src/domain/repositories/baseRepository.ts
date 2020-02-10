import { EntityManager, EntityMetadata, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  constructor(public manager: EntityManager, public metadata: EntityMetadata) {
    super();
  }

  async checkConnection() {
    if (!this.manager.connection.isConnected) {
      await this.manager.connection.connect();
    }
  }
}
