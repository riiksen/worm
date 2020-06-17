import { QueryBuilder } from './QueryBuilder';

import { Connection } from '../connection/Connection';

export class InsertQueryBuilder<Model> extends QueryBuilder<Model> {
  constructor(connection: Connection) {
    super(connection);
  }

  public getQuery(): string {
    return this.craftQuery();
  }

  public craftQuery(): string {
    const query = 'INSERT INTO';

    return query;
  }
}
