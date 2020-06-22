import { BaseAdapter } from './adapters/base';
import { Schema } from './schema';
import { Validation, Validator } from './model';

/**
 * Container that holds a user provided data or state which is derived from user provided data
 */
class Container {
  #adapter?: BaseAdapter;

  #schema?: Schema;

  #validator?: Validator;

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

  get validator(): Validator {
    if (this.#validator) {
      return this.#validator;
    }

    // TODO: custrom class for this error
    throw new Error('no validate function');
  }

  set validator(validator: Validator) {
    this.#validator = validator;
    Validation.validator = validator;
  }
}

// TODO: Change the name of this export
export const container = new Container;
