import { Model } from '../model/Model';
import { Field as FieldClass } from '../utils/Field';
import { DataType } from '../utils/Datatypes';

interface FieldDecoratorOptions {
  fieldName?: string;
  nullable?: boolean;
}


// TODO: fix decorator, there is an error, beacuse of target
// is without properties
/**
 * @param options - field options
 */
export function Field(options?: FieldDecoratorOptions) {
  return <T extends Model>(target: T, propertyKey: string) => {
    let type = Reflect.getMetadata('design:type', target, propertyKey);

    if (Array.isArray(propertyKey)) {
      type = 'Array';
    }

    if (!type) {
      // TODO: create custom type
      throw new Error('type not detected from metadata');
    }
    if (options) {
      const fieldName = options.fieldName ? options.fieldName : propertyKey;
  
      target.fields[fieldName] = new FieldClass({
        name: fieldName,
        type: DataType.type(type),
      })
    } else {
      target.fields[propertyKey] = new FieldClass({
        name: propertyKey,
        type: DataType.type(type),
      })
    }
  }
}
