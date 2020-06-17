import { Field } from './Field';

export abstract class Table {

  /**
   * Table name
   */
  public name: string;


  public fields: Record<string, Field<any>> = {};

}
