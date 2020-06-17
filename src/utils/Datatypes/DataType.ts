type fieldTypes = 'String' | 'Number' | 'Array' | 'Object' | 'Boolean';

export class DataType<Type> {
  /**
   * javascript type
   */
  public type: fieldTypes;

  constructor(type: fieldTypes) {
    this.type = type;
  }

  public static type(type: fieldTypes): DataType<any> {
    switch(type) {
      case 'String':
        return this.string();
      case 'Number':
        return this.number();
      case 'Array':
        return this.array();
      case 'Object':
        return this.object();
      case 'Boolean':
        return this.boolean();
    }
  }

  public static number = (): DataType<number> => {
    return new DataType<number>('Number');
  };

  public static string = (): DataType<string> => {
    return new DataType<string>('String');
  };

  public static array = (): DataType<Array<any>> => {
    return new DataType<Array<any>>('Array');
  }

  public static object = (): DataType<Object> => {
    return new DataType<Object>('Object');
  }

  public static boolean = (): DataType<Boolean> => {
    return new DataType<Boolean>('Boolean');
  }
}
