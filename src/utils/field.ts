import { DataType } from './datatype';

/**
 * Field that contains a table column definition
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

  constructor(args: { name: string, type: DataType<Type> }) {
    this.name = args.name;
    this.type = args.type;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyField = Field<any>
