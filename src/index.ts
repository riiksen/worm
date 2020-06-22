import 'reflect-metadata';

import { BaseAdapter, PostgresConnectionParameters } from './adapters';
import { container } from './container';
import { Validator } from './model';
import { Schema } from './schema';

type Adapter = 'postgres' | 'dummy';

// TODO:
// - Depending on the adapterName join this type dynamically with adapter specific option
// - Make the schema not required
type InitializeOptions = {
  adapterName: Adapter;
  schema: Schema;
  validator?: Validator;
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

    case 'dummy': {
      const { DummyAdapter } = await import('./adapters/dummy');

      adapter = new DummyAdapter;

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

  if (config.validator) {
    container.validator = config.validator;
  }
}

export * from './decorators';
// export * from './errors';
export * from './model';
export * from './schema';
export * from './utils';
