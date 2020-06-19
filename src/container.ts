import { BaseAdapter } from './adapters/base';
import { Schema } from './schema';

/**
 * Container that holds a user provided data or state which is derived from user provided data
 */
class Container {
  #adapter?: BaseAdapter;

  #schema?: Schema;

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
}

// TODO: Change the name of this export
export const container = new Container;
