import { Pool } from 'pg';

import { Driver } from '../Driver';
import { Driver as DriverInterface } from '../DriverInterface';

import { Connection } from '../../connection/Connection';

export class PostgresDriver extends Driver implements DriverInterface {

  public client: Pool;

  constructor(connection: Connection) {
    super(connection, 'postgres')
  }

  public async connect(): Promise<void> {
    this.client = new Pool(this.connection.options.config);

    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.end();
  }
}
