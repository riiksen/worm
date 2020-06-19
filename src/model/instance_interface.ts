import { AnyField, ExtractTypeFromField, Table } from '../utils';

interface Field<Field extends AnyField> {
  changed: boolean;
  value: ExtractTypeFromField<Field>;
}

export type FieldMap<Fields extends Table['fields']> = {
  [K in keyof Fields]: Field<Fields[K]>;
};

// TODO:
// - Move tableName to a static property
// - Change attributes to just fields
export interface ModelInstanceInterface<TableT extends Table=Table> {
  attributes: FieldMap<TableT['fields']>;
  fields: TableT['fields'];
  tableName: string;
  newRecord: boolean;
}
