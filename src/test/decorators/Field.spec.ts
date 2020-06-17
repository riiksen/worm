import { Field } from '../../decorators/Field';
import { Model } from '../../model/Model';

class User extends Model {
  @Field()
  public id: number;
}

describe(Field, () => {
  let model: Model;

  beforeAll(() => {
    model = new User();
  });
});
