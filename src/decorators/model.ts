import { container } from '../container';
import { BaseModel, FieldMap, ModelClassInterface } from '../model';
import { Table } from '../utils';
// import { withMixins } from './with_mixins';

type ExtractTable<M> = (M extends BaseModel<infer Table> ? Table : never);

// TODO:
function getTableNameForModel(modelName: string): string {
  return `${modelName.toLowerCase()}s`;
}

export interface ModelDecoratorOptions {
  tableName?: string;
}
/* eslint-disable no-param-reassign */
export function Model(options?: ModelDecoratorOptions) {
  return <M extends BaseModel, TableT extends ExtractTable<M>>(
    targetModel: ModelClassInterface<M>,
  ): void => {
    // const mixins = withMixins([BaseModel]);
    // mixins(targetModel);

    const optionsWithDefaults: ModelDecoratorOptions & { tableName: string } = {
      tableName: getTableNameForModel(targetModel.name),
      ...options,
    };

    const propertyDescriptors: PropertyDescriptorMap = {};

    const optionsKeys = Object.keys(optionsWithDefaults) as (keyof ModelDecoratorOptions)[];

    optionsKeys.forEach((name: keyof ModelDecoratorOptions) => {
      propertyDescriptors[name] = {
        writable: true,
        value: optionsWithDefaults[name],
      };
    });

    Object.defineProperties(targetModel, propertyDescriptors);

    let modelTable: Table | undefined;

    try {
      const { schema } = container;
      modelTable = schema.getTableWithName(optionsWithDefaults.tableName);
    } catch (e) {
      modelTable = undefined;
    }

    let attributes: FieldMap<(typeof BaseModel)['fields']>;
    let fieldNames;

    // TODO: maybe merge field definitions from the table if we could get
    //       that with those defined by the user using @Field decorator
    if (modelTable) {
      // const extendableMixin = modelTable.createMixinWithFieldsForModel();
      // withMixins([extendableMixin])(targetModel);

      // TODO: remove those assings as we will be accessing static properties of those everywhere
      targetModel.prototype.fields = modelTable.fields;
      targetModel.prototype.tableName = optionsWithDefaults.tableName;

      fieldNames = Object.keys(modelTable.fields);

      attributes = fieldNames.reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: {
          changed: false,
          value: undefined,
        },
      }), {} as FieldMap<(typeof modelTable)['fields']>);
    } else {
      fieldNames = Object.keys(targetModel.fields);

      attributes = fieldNames.reduce((acc, fieldName) => ({
        ...acc,
        [fieldName]: {
          changed: false,
          value: undefined,
        },
      }), {} as FieldMap<(typeof BaseModel)['fields']>);
    }

    targetModel.prototype.attributes = attributes;

    // TODO: Types
    fieldNames.forEach((fieldName) => {
      Object.defineProperty(targetModel.prototype, fieldName, {
        get(): TableT['fields'][typeof fieldName] {
          return this.attributes[fieldName].value;
        },
        set(value: TableT['fields'][typeof fieldName]): void {
          if (this.attributes[fieldName].value !== value) {
            this.attributes[fieldName] = {
              changed: true,
              value,
            };
          }
        },
      });
    });
  };
}
