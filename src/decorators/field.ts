import { BaseModel } from '../model';
import { AnyField, DataType, FieldDefinition } from '../utils';

interface FieldDecoratorOptions {
  fieldName?: string;
  nullable?: boolean;
}

/**
 * @param options - optional field options
 */
export function Field(options?: FieldDecoratorOptions) {
  return <M extends BaseModel>(target: M, propertyKey: string): void => {
    const type = Reflect.getMetadata('design:type', target, propertyKey).name;

    if (!type) {
      // TODO: create custom type
      throw new Error('type not detected from metadata');
    }

    const fields = target.constructor.fields || {} as Record<string, AnyField>;
    const fieldName = options?.fieldName || propertyKey;

    fields[fieldName] = new FieldDefinition(
      fieldName,
      DataType.type(type),
    );

    Object.defineProperty(target.constructor, 'fields', {
      value: fields,
    });
  };
}
