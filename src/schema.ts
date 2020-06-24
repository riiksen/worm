import {
  AnyField,
  AnyType,
  FieldDefinition,
  Table,
} from './utils';

// TODO: Move that to a different file
type Merge<T> = (
  {
    [K in keyof T]: T[K]
  }
);

type MergeSchemaWithTable<
  SchemaT extends Schema,
  TableName extends string,
  TableColumn extends Record<string, AnyType>
> = (
  Merge<{
    version: SchemaT['version'];
    tables: {
      [Name in (keyof SchemaT['tables']) & TableName]: {
        name: TableName;
        fields: {
          [K in keyof TableColumn]: {
            name: K;
            type: TableColumn[K];
          }
        }
      }
    };
  } & SchemaT>
);

/**
 * TODO
 */
export class Schema {
  public tables: Record<string, Table> = {};

  public version?: number;

  constructor(version?: number) {
    this.version = version;
  }

  public createTable<TableName extends string, TableColumns extends Record<string, AnyType>>(
    name: TableName,
    columnMap: TableColumns,
  ): (
    MergeSchemaWithTable<this, TableName, TableColumns>
  ) {
    const columnNames = Object.keys(columnMap);

    const fields = columnNames.reduce((acc, columnName) => {
      return {
        ...acc,
        [columnName]: new FieldDefinition(
          columnName,
          columnMap[columnName],
        ),
      };
    }, {} as Record<keyof TableColumns, AnyField>);

    const table = new Table(name, fields);

    this.tables = { ...this.tables, [name]: table };

    return this as MergeSchemaWithTable<this, TableName, TableColumns>;
  }

  // TODO: Name of this function
  public getTableWithName = (modelName: string): Table | undefined => {
    return this.tables[modelName];
  };
}

export interface DefineSchemaOptions {
  version?: number;
}

// TODO: Make the schema options nullable
export function defineSchema(
  { version }: DefineSchemaOptions,
): Schema {
  return new Schema(version);
}
