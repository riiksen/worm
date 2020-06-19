import { AnyField } from './field';

/**
 * TODO
 * Class that contains a database table definition along with it's other data
 */
export class Table {
  /**
   * Name of the table
   */
  public name: string;

  /**
   * A record of table columns, mapped as ColumnName => ColumnData
   */
  public fields: Record<string, AnyField>;

  constructor(name: string, fields: Record<string, AnyField>) {
    this.name = name;
    this.fields = fields;
  }
}
