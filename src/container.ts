import { BaseAdapter } from './adapters/base';
import { Schema } from './schema';
import { Table } from './utils';

export type ValidationResult<TableT extends Table=Table> = {
  success: boolean;
  errors?: {
    [K in keyof TableT['fields']]?: {
      constraints: Record<string, string>;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationFunction<M=any> = (instance: M) => Promise<ValidationResult>;

/**
 * Container that holds a user provided data or state which is derived from user provided data
 */
class Container {
  #adapter?: BaseAdapter;

  #schema?: Schema;

  #validator?: ValidationFunction;

  get adapter(): BaseAdapter {
    if (this.#adapter) {
      return this.#adapter;
    }

    // TODO:
    // - Create a custom class for this error
    // - Better description of the error
    throw new Error('no adapter');
  }

  set adapter(adapter: BaseAdapter) {
    this.#adapter = adapter;
  }

  get schema(): Schema {
    if (this.#schema) {
      return this.#schema;
    }

    // TODO:
    // - Create a custom class for this error
    // - Better description of the error
    throw new Error('no schema');
  }

  set schema(schema: Schema) {
    this.#schema = schema;
  }

  get validator(): ValidationFunction {
    if (this.#validator) {
      return this.#validator;
    }

    // TODO: custrom class for this error
    throw new Error('no validate function');
  }

  set validator(validateFunction: ValidationFunction) {
    this.#validator = validateFunction;
  }
}

// TODO: Change the name of this export
export const container = new Container;
