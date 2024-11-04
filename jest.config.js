/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', 'src/modules'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  transform: {
    "^.+.ts$": ["ts-jest",{}],
  },
};