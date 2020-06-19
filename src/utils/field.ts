import { DataType } from './datatype';

export type ExtractTypeFromField<FieldT> = (
  FieldT extends FieldDefinition<infer Type> ? Type : never
);

/**
 * FieldDefinition that contains a table column definition
 */
export class FieldDefinition<Type> {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyField = FieldDefinition<any>
