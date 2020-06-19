import { DataType } from './Datatypes';

/**
 * Class that contains a table field definition
 */
export class Field<Type> {
  /**
   * Name of the column
   */
  public readonly name: string;

  /**
   * Type of the column in database and typescript
   */
  public readonly type: DataType<Type>;

  constructor(name: string, type: DataType<Type>) {
    this.name = name;
    this.type = type;
  }
}

export type AnyField = Field<any>;
