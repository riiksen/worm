/**
 * DataType constructor arguments
 */
export interface DataTypeOptions {
  type: string;
  nullable?: boolean;
}

/**
 * Class that holds database types mapped to types in typescript
 *
 * TODO:
 *   - Implement the rest of the types
 */
export class DataType<Type> {
  public static integer = (): DataType<number> => {
    return new DataType<number>({ type: 'integer' });
  };

  public static string = (): DataType<string> => {
    return new DataType<string>({ type: 'string' });
  };

  /**
   * Adapter compatible type represented as a string
   */
  public readonly type: string;

  /**
   * Is the type nullable
   */
  public isNullable: boolean;

  constructor({ type, nullable = false }: DataTypeOptions) {
    this.type = type;
    this.isNullable = nullable;
  }

  public nullable = (): DataType<Type | undefined> => {
    this.isNullable = true;

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = DataType<any>;
