/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        tsconfig: './configs/tsconfig.base.json',
      },
    ],
  },

  moduleNameMapper: {
    '(.*).js': '$1',
  },
};
