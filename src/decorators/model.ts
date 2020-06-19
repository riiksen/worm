import { Model } from '../model';
import { FieldMap } from '../model/instance_interface';
import { container } from '../container';

type ConstructorType<M> = { new (): M };

type ExtractTable<M> = (M extends Model<infer Table> ? Table : never);

// TODO:
function getTableNameForModel(modelName: string): string {
  return `${modelName.toLowerCase()}s`;
}

/* eslint-disable no-param-reassign */
export function model<
  M extends Model,
  Table extends ExtractTable<M>
>(targetModel: ConstructorType<M & Model<Table>>): void {
  const { schema } = container;

  const tableName = getTableNameForModel(targetModel.name);

  const modelTable = schema.getTableWithName(tableName);

  // const extendableMixin = modelTable.createMixinWithFieldsForModel();
  // withMixins([extendableMixin])(targetModel);

  // targetModel.tableName = modelTable.name;

  targetModel.prototype.fields = modelTable.fields;
  targetModel.prototype.tableName = modelTable.name;

  const fieldNames = Object.keys(modelTable.fields);

  const attributes = fieldNames.reduce((acc, fieldName) => ({
    ...acc,
    [fieldName]: {
      changed: false,
      value: undefined,
    },
  }), {} as FieldMap<typeof modelTable>);

  targetModel.prototype.attributes = attributes;

  // TODO: Types
  fieldNames.forEach((fieldName) => {
    Object.defineProperty(targetModel.prototype, fieldName, {
      get(): Table['fields'][typeof fieldName] {
        return targetModel.prototype.attributes[fieldName];
      },
      set(value: Table['fields'][typeof fieldName]): void {
        if (targetModel.prototype.attributes[fieldName].value !== value) {
          targetModel.prototype.attributes[fieldName] = {
            changed: true,
            value,
          };
        }
      },
    });
  });
}
