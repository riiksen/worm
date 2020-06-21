import 'reflect-metadata';

import { validate } from 'class-validator';

import { BaseAdapter, PostgresConnectionParameters } from './adapters';
import { container, ValidationFunction, ValidationResult } from './container';
import { Schema } from './schema';
import { Table } from './utils';
import { BaseModel } from './model';

type Adapter = 'postgres' | 'dummy';

// TODO:
// - Depending on the adapterName join this type dynamically with adapter specific option
type InitializeOptions = {
  adapterName: Adapter;
  schema: Schema;
  validator?: ValidationFunction;
} & PostgresConnectionParameters;

/**
 * Setups a database connection and initializes whole orm
 */
export async function initialize<
  M extends BaseModel=BaseModel
>({
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

  let validator: ValidationFunction<M> =
    async function validateFunction<M>(instance: M): Promise<ValidationResult> {
      const validationResult: ValidationResult = { success: true };
      const errors = await validate(instance);
      if (errors.length > 0) {
        validationResult.success = false;

        errors.forEach((error) => {
          validationResult.errors = {};
          const propertyKey: keyof Table['fields'] = error.property;
          if (!validationResult.errors[propertyKey]) {
            validationResult.errors[propertyKey] = {
              constraints: error.constraints || {},
            };
          }
        });
      }
      return validationResult;
    };

  if (config.validator) {
    validator = config.validator;
  }

  adapter.connect();

  container.adapter = adapter;
  container.schema = schema;
  container.validator = validator;
}

export * from './decorators';
// export * from './errors';
export * from './model';
export * from './schema';
export * from './utils';
