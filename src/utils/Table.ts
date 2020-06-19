import { Field } from './Field';

export abstract class Table {

  ['constructor']: typeof Table;

  /**
   * Table name
   */
  public static tableName: string;

  /**
   * A record of table fields, mapped as fieldName: fieldData
   */
  public static fields: Record<string, Field<any>>;

}
