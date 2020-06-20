import { ModelInstanceInterface } from './instance_interface';

import { AnyField } from '../utils';

/**
 * Static properties that any Model will include while extending a BaseModel
 */
export interface ModelClassInterface<Model extends ModelInstanceInterface> {
  new (): Model;

  fields: Record<string, AnyField>;
  tableName: string;
}
