/**
 * Class that holds database types mapped to types in typescript
 *
 * TODO:
 *   - Implement the rest of the types
 */
export class DataType<Type> {
  public readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  public static integer = (): DataType<number> => {
    return new DataType<number>('integer');
  };

  public static string = (): DataType<string> => {
    return new DataType<string>('string');
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = DataType<any>;
