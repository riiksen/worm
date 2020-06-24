import {
  BaseModel,
  Model,
} from '../../src';

@Model()
class User extends BaseModel {
  public id!: string;
}

describe(Model, () => {
  let user: User;

  beforeAll(() => {
    user = new User;
  });

  test('Should set model name to lowercase class name if not provided', () => {
    expect(User.tableName).toEqual('users');
  });
});
