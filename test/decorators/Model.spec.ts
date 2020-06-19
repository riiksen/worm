import { Model } from '../../src/decorators/Model';
import { BaseModel } from '../../src/model/BaseModel';

@Model()
class User extends BaseModel {
  public id: string;
}

describe(Model, () => {
  let user: User;

  beforeAll(() => {
    user = new User();
  });

  test('Should set model name to lowercase class name if not provided', () => {
    expect(User.tableName).toEqual('user');
  });
});
