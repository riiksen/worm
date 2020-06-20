export type StringType = 'String' | 'Number' | 'Array' | 'Object' | 'Boolean' | 'Integer';

/**
 * DataType constructor arguments
 */
export interface DataTypeOptions {
  type: StringType;
  nullable?: boolean;
}

/**
 * Class that holds database types mapped to types in typescript
 *
 * TODO:
 *   - Implement the rest of the types
 *   - Integer, Number
 *   - Generic Array type
 *   - Generic object type
 */
export class DataType<Type> {
  // TODO: Directly call the constructor instead of calling next static function
  // TODO: Do not return AnyType, actually type this
  public static type(type: StringType): AnyType {
    switch (type) {
      case 'String':
        return this.string();
      case 'Integer':
        return this.integer();
      case 'Number':
        return this.number();
      case 'Array':
        return this.array();
      case 'Object':
        return this.object();
      case 'Boolean':
        return this.boolean();
      default:
        throw new Error('unexpected type');
    }
  }

  public static integer = (): DataType<number> => {
    return new DataType<number>({ type: 'Integer' });
  };

  public static number = (): DataType<number> => {
    return new DataType<number>({ type: 'Number' });
  };

  public static string = (): DataType<string> => {
    return new DataType<string>({ type: 'String' });
  };

  // TODO: Generic Array should be typed
  public static array = (): DataType<any[]> => {
    return new DataType<any[]>({ type: 'Array' });
  }

  // TODO: Object should be typed as generic interface passed to this function
  public static object = (): DataType<Object> => {
    return new DataType<Object>({ type: 'Object' });
  }

  public static boolean = (): DataType<boolean> => {
    return new DataType<boolean>({ type: 'Boolean' });
  }

  /**
   * Adapter compatible type represented as a string
   */
  public readonly type: StringType;

  /**
   * Is the type nullable
   */
  public isNullable: boolean;

  constructor(options: DataTypeOptions) {
    this.type = options.type;
    this.isNullable = options.nullable || false;
  }

  public nullable = (): DataType<Type | undefined> => {
    this.isNullable = true;

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = DataType<any>;
