import { createConnection } from 'typeorm';
import { Logger } from '../../infrastructure/adapters/logger/logger';

/**
 * This factory creates new connection. It will encapsulate getting connection
 * settings from config, env or another api service like Secrets manager.
 * Only this class knows about how to create a connection.
 */
export class DbConnectionFactory {
  /**
   * Constructor
   * @param config - TypeOrm, db config
   * @param logger - logger
   */
  constructor(
    private readonly config,
    private readonly logger: Logger
  ) {
  }

  /**
   * Creates new SQL DB connection
   * @param entities – TypeORM entities (User, Menu, ..)
   * @param localCredentials – for local connection or when settings are passed outside this
   * factory
   */
  async create(
    entities,
    localCredentials?: { database: string, username: string, password: string, host: string, port: number, type: string }
  ) {
    try {
      // it's simple for now, but might be improved in the future
      // if we will have more connection scenarios
      const credentials = localCredentials || await this.config;

      const connectionOptions = {
        entities,
        ...credentials
      };

      this.logger.info(DbConnectionFactory.name, this.create.name, 'Creating new DB connection');
      const connection = await createConnection(connectionOptions);
      this.logger.info(DbConnectionFactory.name, this.create.name, 'Created new DB connection', connection.name);
      return connection;
    } catch (error) {
      this.logger.error(DbConnectionFactory.name, this.create.name, error);
      throw error;
    }
  }
}
