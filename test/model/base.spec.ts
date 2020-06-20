import { Min, ValidationError } from 'class-validator';

import { BaseModel } from '../../src/model/base';
import { initialize } from '../../src';
import { container } from '../../src/container';
import { Field } from '../../src/decorators/field';
import { Model } from '../../src/decorators/model';
import { defineSchema } from '../../src/schema';

@Model()
class User extends BaseModel {
  @Min(18)
  @Field()
  public age!: number;
}

describe(BaseModel, () => {
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
    test('Should throw validation Error on age smaller than 18', async () => {
      const user = new User;
      user.age = 17;

      try {
        await user.validate();

        throw new Error('should fail after validation');
      } catch (e) {
        expect(e[0]).toBeInstanceOf(ValidationError);
      }
    });

    test('Should not throw an Error on age atleast 18', async () => {
      const user = new User;
      user.age = 19;
      await user.validate();
    });
  });
});
