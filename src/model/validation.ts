import { container, ValidationResult } from '../container';
import { Table } from '../utils';

export class Validation<TableT extends Table=Table> {
  public async validate(): Promise<ValidationResult> {
    return container.validator(this);
  }
}
