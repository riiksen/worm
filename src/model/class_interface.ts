import { ModelInstanceInterface } from './instance_interface';

import { AnyField } from '../utils';

export interface ModelClassInterface<Model extends ModelInstanceInterface> {
  new (): Model;

  fields: Record<string, AnyField>;
  tableName: string;
}
