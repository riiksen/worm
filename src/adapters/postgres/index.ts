import { Client } from 'pg';

import { PostgresConnectionParameters } from './connection_parameters';
import { BaseAdapter } from '../base';

/**
 * Database adapter for PostgreSQL
 */
export class PostgresAdapter extends BaseAdapter {
  public connection: Client;

  constructor(connectionParameters: PostgresConnectionParameters) {
    super();

    this.connection = new Client({
      ...connectionParameters,
    });
  }

  async connect(): Promise<void> {
    await this.connection.connect();
  }
}
