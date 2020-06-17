import { ConnectionOptions } from './ConnectionOptions';

export class Connection {

  /**
   * Connection name
   */
  readonly name: string;

  /**
   * Indicates if connection is established
   */
  readonly isConnected: boolean;

  /**
   * Connection options
   */
  readonly options: ConnectionOptions;

  constructor(options: ConnectionOptions) {
    this.name = options.name || 'default';
    this.options = options;
    this.isConnected = false;
  }
};
