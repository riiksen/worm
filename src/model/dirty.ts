import { ModelInstanceInterface } from './instance_interface';
import { ExtractTypeFromField, Table } from '../utils';

/**
 * Type that maps Table fields to typescript types
 *
 * TODO:
 * - Write that as a class
 */
type Changeset<TableT extends Table=Table> = {
  [K in keyof TableT['fields']]: ExtractTypeFromField<TableT['fields'][K]>;
};

export interface Dirty<TableT extends Table=Table> extends ModelInstanceInterface<TableT> {}

/**
 * Mixin that is applied to Model class that holds methods used to keep track of changes made to
 * instance of a model
 */
export class Dirty<TableT extends Table=Table> {
  /**
   * Returns a set of changes that were made to a model
   */
  public changeset(): Changeset<TableT> {
    // TODO: Add helper tyoe for (keyof X)[]
    // TODO: Access a static property fields rather than instance one
    const attributesNames = Object.keys(this.attributes) as (keyof this['fields'])[];

    // Pick fields from the instance of the model that were changed
    return attributesNames.reduce((acc, name) => (
      this.attributes[name].changed ? {
        ...acc,
        [name]: this.attributes[name].value,
      } : acc
    ), {} as Changeset<TableT>);
  }
}
