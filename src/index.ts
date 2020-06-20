import 'reflect-metadata';

import { validateOrReject } from 'class-validator';

import { BaseAdapter, PostgresConnectionParameters } from './adapters';
import { container, ValidationFunction } from './container';
import { Schema } from './schema';

type Adapter = 'postgres';

// TODO:
// - Depending on the adapterName join this type dynamically with adapter specific option
type InitializeOptions = {
  adapterName: Adapter;
  schema: Schema;
  validateFunction?: ValidationFunction;
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

  let validateFunction: ValidationFunction;

  if (config.validateFunction) {
    validateFunction = config.validateFunction;
  } else {
    // eslint-disable-next-line max-len
    validateFunction = async function validate<M>(instance: M): Promise<void> {
      await validateOrReject(instance);
    };
  }

  adapter.connect();

  container.adapter = adapter;
  container.schema = schema;
  container.validateFunction = validateFunction;
}

export * from './decorators';
// export * from './errors';
export * from './model';
export * from './schema';
export * from './utils';
