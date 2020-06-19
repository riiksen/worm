import { Dirty } from './dirty';
import { ModelInstanceInterface } from './instance_interface';
import { Persistence } from './persistence';

import { AnyField, Table } from '../utils';
import { withMixins } from '../decorators/with_mixins';

export interface BaseModel<TableT extends Table=Table> extends
  ModelInstanceInterface<TableT>,
  Dirty<TableT>,
  Persistence<TableT> {}

@withMixins([Dirty, Persistence])
export abstract class BaseModel<TableT extends Table=Table> {
  ['constructor']: typeof BaseModel;

  /**
   * A record of table columns, mapped as ColumnName => ColumnData
   */
  public static fields: Record<string, AnyField>;

  /**
   * Table name of the Model
   */
  public static tableName: string;

  // TODO: Maybe move that to a constructor
  public newRecord = true;
}
