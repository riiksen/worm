import { Connection } from './Connection';
import { ConnectionOptions } from './ConnectionOptions';

import * as Errors from '../errors';

export class ConnectionManager {

  /**
   * Array of connections
   */
  public connections: Connection[] = [];

  /**
   * @param {string} [name=default] - Name of connection
   * @returns {Connection} - Connection
   */
  static get(name = 'default'): Connection {
    const connection = this.prototype.connections.find((conn) => conn.name === name);
    if (!connection) {
      throw new Errors.connection.ConnectionNotFound(name);
    }
    return connection;
  }

  static set({ name = 'default', ...options }: ConnectionOptions): Connection {
    const connection = new Connection({ name, ...options });
    if (this.prototype.connections.find((conn) => conn.name === name)) {
      throw new Errors.connection.ConnectionAlreadyExists(name);
    }
    return connection;
  }
}
