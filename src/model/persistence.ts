import { Dirty } from './dirty';
import { ModelInstanceInterface } from './instance_interface';

import { Table } from '../utils';

export interface Persistence<
  TableT extends Table=Table
> extends ModelInstanceInterface<TableT>, Dirty<TableT> {}

export class Persistence<TableT extends Table=Table> {
  // TODO: Add pre save and post save hooks
  public save(): Promise<void> {
    // If it is a new record (it hasn't been fetched from the datastore) save
    // should insert new record into datastore otherwise it should update it
    return this.newRecord ? this.insert() : this.update();
  }

  // TODO: Implement
  public async insert(): Promise<void> {
    throw new Error('No implementation Error');
  }

  // TODO: Implement
  public async update(): Promise<void> {
    throw new Error('No implementation Error');
  }
}
