import { Connection } from '../connection/Connection';

export abstract class Driver {

  readonly connection: Connection;

  public name: string;

  /**
   * Database client or pool
   */
  public client: any;

  /**
   * @param connection - database connection
   * @param name - driver name
   */
  constructor(connection: Connection, name: string) {
    this.connection = connection;
    this.name = name;
  }

}
