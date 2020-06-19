import { BaseModel } from '../model/BaseModel';
import { Field as FieldClass } from '../utils/Field';
import { DataType } from '../utils/Datatypes';

interface FieldDecoratorOptions {
  fieldName?: string;
  nullable?: boolean;
}

/**
 * @param options - optional field options
 */
export function Field(options?: FieldDecoratorOptions) {
  return <M extends BaseModel>(target: M, propertyKey: string) => {
    let type = Reflect.getMetadata('design:type', target, propertyKey).name;
    if (Array.isArray(propertyKey)) {
      type = 'Array';
    }
    if (!type) {
      // TODO: create custom type
      throw new Error('type not detected from metadata');
    }
    let fields = target.constructor.fields ? target.constructor.fields : {} as Record<string, FieldClass<any>>;

    if (options) {
      const fieldName = options.fieldName ? options.fieldName : propertyKey;

      fields[fieldName] = new FieldClass(
        fieldName,
        DataType.type(type),
      );
    } else {
      fields[propertyKey] = new FieldClass(
        propertyKey,
        DataType.type(type),
      );
    }

    Object.defineProperty(target.constructor, 'fields', {
      value: fields,
    });
  };
}
