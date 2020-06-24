import { Min } from 'class-validator';

import {
  defineSchema,
  initialize,
  BaseModel,
  Field,
  Model,
  ModelInstanceInterface,
  Validation,
  ValidationResult,
} from '../../src';
import { container } from '../../src/container';

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
      schema: defineSchema({}),
    });
  });

  afterAll(async () => {
    await container.adapter.disconnect();
  });

  describe('with default validator', () => {
    describe('#validate', () => {
      test('Should include age property in errors if age is less than 18', async () => {
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
  });

  describe('with custom validator', () => {
    beforeAll(() => {
      const customValidator = async <M extends ModelInstanceInterface>(
        instance: M,
      ): Promise<ValidationResult> => {
        const validationResult: ValidationResult = { success: true };
        const errors: CustomValidationError[] = [];

        if ((instance as unknown as User).evenNumber % 2 !== 0) {
          errors.push(
            new CustomValidationError({
              mustBeEvenNumber: 'property evenNumber must be even',
            }, 'evenNumber'),
          );
        }

        if (errors.length) {
          validationResult.success = false;
          const errorsObject: typeof validationResult['errors'] = {};

          Object.values(errors).forEach((error) => {
            errorsObject[error.property] = error.constraints;
          });

          validationResult.errors = errorsObject;
        }

        return validationResult;
      };

      initialize({
        adapterName: 'dummy',
        schema: defineSchema({}),
        validator: customValidator,
      });
    });

    describe('#validate', () => {
      test('Should include evenNumber property in errors if number is not even', async () => {
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
