import { ExtractTypeFromField, Table } from '../utils';

interface Field<Field> {
  changed: boolean;
  value: ExtractTypeFromField<Field>;
}

export type FieldMap<TableT extends Table> = {
  [K in keyof TableT['fields']]: Field<TableT['fields'][K]>;
};

// TODO:
// - Move tableName to a static property
// - Change attributes to just fields
export interface ModelInstanceInterface<TableT extends Table=Table> {
  attributes: FieldMap<TableT>;
  fields: TableT['fields'];
  tableName: string;
  newRecord: boolean;
}
