/**
 * BaseAdapter provides a abstract interface for actual database adapters that have to implement it.
 */
export abstract class BaseAdapter {
  abstract async connect(): Promise<void>;
}
