import { BaseModel } from '../model';
import { DataType, FieldDefinition } from '../utils';

interface FieldDecoratorOptions {
  fieldName?: string;
  nullable?: boolean;
}

/**
 * @param options - optional field options
 */
export function Field(options?: FieldDecoratorOptions) {
  return <M extends BaseModel>(target: M, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey).name;

    if (!type) {
      // TODO: create custom type
      throw new Error('type not detected from metadata');
    }

    let fields = target.constructor.fields ? target.constructor.fields : {} as Record<string, FieldDefinition<any>>;

    let fieldName: string;

    if (options) {
      fieldName = options.fieldName ? options.fieldName : propertyKey;
    } else {
      fieldName = propertyKey;
    }

    fields[fieldName] = new FieldDefinition(
      fieldName,
      DataType.type(type),
    );

    Object.defineProperty(target.constructor, 'fields', {
      value: fields,
    });
  };
}
