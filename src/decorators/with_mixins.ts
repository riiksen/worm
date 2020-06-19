type ConstructorType<C> = { new (): C };

/**
 * Function that copies properties from classes in mixins array to a targetClass
 */
export function withMixins<M>(
  mixins: ConstructorType<M>[],
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <T>(targetClass: Function & { prototype: T }): void => {
    mixins.forEach((mixin: { new (): M }): void => {
      Object.getOwnPropertyNames(mixin.prototype).forEach((propertyName: string): void => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(mixin.prototype, propertyName);

        if (propertyDescriptor) {
          Object.defineProperty(
            targetClass.prototype,
            propertyName,
            propertyDescriptor,
          );
        }
      });
    });
  };
}
