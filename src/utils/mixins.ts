type ConstructorType<C> = { new (): C };

/**
 * Function that copies properties from classes in mixins to a targetClass
 */
export function withMixins<M>(
  mixins: ConstructorType<M>[],
): (targetClass: any) => void {
  return (targetClass: any): void => {
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
