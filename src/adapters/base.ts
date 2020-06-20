/**
 * BaseAdapter provides an abstract interface for database adapters to implement it.
 */
export abstract class BaseAdapter {
  abstract async connect(): Promise<void>;

  abstract async disconnect(): Promise<void>;

  abstract async reconnect(): Promise<void>;
}
