import { Connection } from '../connection/Connection';
import { Driver } from '../drivers/Driver';

interface ExpressionValue {
  type: string;
  values: (string | number | null)[];
}

interface Expression<Model> {
  values: Record<string, ExpressionValue>;
}

export abstract class QueryBuilder<Model> {

  readonly connection: Connection;

  protected driver: Driver;

  protected expressions: Record<string, Expression<Model>>;

  /**
   * @param connection - database connection
   */
  constructor(connection: Connection) {
    this.connection = connection;
  }

  abstract getQuery(): string;

}
