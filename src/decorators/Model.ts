interface ModelConfig {
  tableName: string;
}

export function Model(config: ModelConfig) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    
  }
}
