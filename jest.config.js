const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.js'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
