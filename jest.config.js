const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  roots: ['./test'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
