import { Dirty } from './dirty';
import { ModelInstanceInterface } from './instance_interface';
import { Persistence } from './persistence';

import { Table } from '../utils';
import { withMixins } from '../decorators/with_mixins';

export interface Model<TableT extends Table=Table> extends
  ModelInstanceInterface<TableT>,
  Dirty<TableT>,
  Persistence<TableT> {}

// TODO Add static fields property
@withMixins([Dirty, Persistence])
export abstract class Model<TableT extends Table=Table> {
  public static tableName: string;

  // TODO: Maybe move that to a constructor
  public newRecord = true;
}
