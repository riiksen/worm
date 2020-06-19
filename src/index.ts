import { BaseAdapter, PostgresConnectionParameters } from './adapters';
import { container } from './container';
import { Schema } from './schema';

type Adapter = 'postgres';

// TODO:
// - Depending on the adapterName join this type dynamically with adapter specific option
type InitializeOptions = {
  adapterName: Adapter;
  schema: Schema;
} & PostgresConnectionParameters;

/**
 * Setups a database connection and initializes whole orm
 */
export async function initialize({
  adapterName,
  schema,
  ...config
}: InitializeOptions): Promise<void> {
  let adapter: BaseAdapter;

  switch (adapterName) {
    case 'postgres': {
      const { PostgresAdapter } = await import('./adapters/postgres');

      adapter = new PostgresAdapter(config);

      break;
    }

    default: {
      // TODO: Custom error
      throw new Error;
    }
  }

  adapter.connect();

  container.adapter = adapter;
  container.schema = schema;
}

export * from './decorators';
export * from './model';
export * from './schema';
export * from './utils';
