import { BaseAdapter } from './adapters/base';
import { Schema } from './schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationFunction<M=any> = (instance: M) => Promise<void>;

/**
 * Container that holds a user provided data or state which is derived from user provided data
 */
class Container {
  #adapter?: BaseAdapter;

  #schema?: Schema;

  #validateFunction?: ValidationFunction;

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

  get validateFunction(): ValidationFunction {
    if (this.#validateFunction) {
      return this.#validateFunction;
    }

    // TODO: custrom class for this error
    throw new Error('no validate function');
  }

  set validateFunction(validateFunction: ValidationFunction) {
    this.#validateFunction = validateFunction;
  }
}

// TODO: Change the name of this export
export const container = new Container;
