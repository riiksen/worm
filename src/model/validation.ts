// TODO: Import that only when custom validator function isn't provided in initialize options
import { validate } from 'class-validator';

import { ModelInstanceInterface } from './instance_interface';

import { Table } from '../utils';

export type ValidationResult<TableT extends Table=Table> = {
  success: boolean;
  errors?: {
    [K in keyof TableT['fields']]?: Record<string, string>;
  }
}

export type Validator<M extends ModelInstanceInterface=ModelInstanceInterface> = (
  (instance: M) => Promise<ValidationResult>
);

export interface Validation<TableT extends Table=Table> extends ModelInstanceInterface<TableT> {}

export class Validation<TableT extends Table=Table> {
  static validator: Validator = async <M extends ModelInstanceInterface>(
    instance: M,
  ): Promise<ValidationResult> => {
    const validationErrors = await validate(instance);

    if (!validationErrors.length) {
      return { success: true };
    }

    const errors = validationErrors.reduce((acc, error) => {
      return {
        ...acc,
        [error.property]: error.constraints,
      };
    }, {} as ValidationResult['errors']);

    return {
      success: false,
      errors,
    };
  };

  public async validate(): Promise<ValidationResult> {
    return Validation.validator(this);
  }
}
