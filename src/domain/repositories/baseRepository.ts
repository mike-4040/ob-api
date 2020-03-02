import { EntityManager, EntityMetadata, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  constructor(public manager: EntityManager, public metadata: EntityMetadata) {
    super();
  }

  /**
   * Checks connection status
   */
  async checkConnection() {
    // Database connection initialization
    // Check connection: was it expired or not
    // if expired - reconnect
    // if not and already exist - reuse
    if (!this.manager.connection.isConnected) {
      await this.manager.connection.connect();
    }
  }
}
