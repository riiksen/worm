import {
  BaseModel,
  Field,
  FieldDefinition,
} from '../../src';

class User extends BaseModel {
  @Field()
  public id!: number;

  @Field({
    fieldName: 'user_name',
    nullable: true,
  })
  public username!: string;
}

describe(Field, () => {
  describe('#id', () => {
    it('User.fields should have id property which is Field instance with type Number', () => {
      expect(User.fields).toHaveProperty('id');
      expect(User.fields.id).toBeInstanceOf(FieldDefinition);
      expect(User.fields.id.type.type).toEqual('Number');
    });
  });

  describe('#username', () => {
    it('User.fields should have user_name property', () => {
      expect(User.fields).toHaveProperty('user_name');
    });

    it('User.fields should have user_name property which is Field instance with type String', () => {
      expect(User.fields.user_name).toBeInstanceOf(FieldDefinition);
      expect(User.fields.user_name.type.type).toEqual('String');
    });
  });
});
