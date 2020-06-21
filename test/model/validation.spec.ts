import { Min } from 'class-validator';

import { BaseModel } from '../../src/model/base';
import { Validation } from '../../src/model/validation';
import { initialize } from '../../src';
import { container, ValidationResult } from '../../src/container';
import { Field } from '../../src/decorators/field';
import { Model } from '../../src/decorators/model';
import { defineSchema } from '../../src/schema';

@Model()
class User extends BaseModel {
  @Min(18)
  @Field()
  public age!: number;

  public evenNumber!: number;
}

class CustomValidationError extends Error {
  public constraints: Record<string, string>;

  public property: string;

  constructor(constraints : Record<string, string>, property: string) {
    super(`Error while validating property ${property}`);

    this.constraints = constraints;
    this.property = property;
  }
}

describe(Validation, () => {
  beforeAll(() => {
    initialize({
      adapterName: 'dummy',
      schema: defineSchema({
        version: 123,
      }),
    });
  });

  afterAll(async () => {
    await container.adapter.disconnect();
  });

  describe('#validate', () => {
    describe('default validator', () => {
      test('Should have age property in errors if passed age is less than 18', async () => {
        const user = new User;
        user.age = 17;

        const { success, errors } = await user.validate();
        expect(success).toBeFalsy();
        expect(errors).toHaveProperty('age');
      });

      test('should pass successfly and errors should not be defined', async () => {
        const user = new User;
        user.age = 19;

        const { success, errors } = await user.validate();
        expect(success).toBeTruthy();
        expect(errors).toBeUndefined();
      });
    });

    describe('custom validator', () => {
      beforeAll(() => {
        initialize({
          adapterName: 'dummy',
          schema: defineSchema({
            version: 123,
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validator: async (instance: any): Promise<ValidationResult> => {
            const validationResult: ValidationResult = { success: true };
            const errors: CustomValidationError[] = [];
            if (instance.evenNumber % 2 !== 0) {
              errors.push(
                new CustomValidationError({
                  mustBeEvenNumber: 'property evenNumber must be even',
                }, 'evenNumber'),
              );
            }
            if (errors.length > 0) {
              validationResult.success = false;
              const errorsObject: typeof validationResult['errors'] = {};
              Object.values(errors).forEach((error) => {
                errorsObject[error.property] = {
                  constraints: error.constraints,
                };
              });
              validationResult.errors = errorsObject;
            }
            return validationResult;
          },
        });
      });

      test('Should have evenNumber property in errors if passed number is not even', async () => {
        const user = new User;
        user.evenNumber = 1;

        const { success, errors } = await user.validate();

        expect(success).toBeFalsy();
        expect(errors).toHaveProperty('evenNumber');
      });

      test('Should return errors: undefined and success: true if evenNumber is even', async () => {
        const user = new User;
        user.evenNumber = 2;

        const { success, errors } = await user.validate();

        expect(success).toBeTruthy();
        expect(errors).toBeUndefined();
      });
    });
  });
});
