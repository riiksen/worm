import { PoolConfig as PostgresPoolConfig } from 'pg';

export type ConnectionConfig =
  PostgresPoolConfig;

export interface ConnectionOptions {
  config: ConnectionConfig;
  name?: string;
}
