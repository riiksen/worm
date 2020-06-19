import { BaseModel } from '../model/BaseModel';
import { withMixins } from '../utils/mixins';

interface ModelConfig {
  tableName: string;
}

type ModelType<M> = { new (): M };

// TODO: add more properties to config
export function Model(config?: ModelConfig) {
  return <M>(target: ModelType<M>): void => {
    const setMixins = withMixins([BaseModel]);
    setMixins(target);

    const configWithDefaults = {
      tableName: target.name.toLowerCase(),
      ...config,
    } as ModelConfig;

    const propertyDescriptors: PropertyDescriptorMap = {};

    Object.keys(configWithDefaults).forEach((name: keyof ModelConfig) => {
      propertyDescriptors[name] = {
        writable: true,
        value: configWithDefaults[name],
      };
    });

    Object.defineProperties(target, propertyDescriptors);
  };
}
