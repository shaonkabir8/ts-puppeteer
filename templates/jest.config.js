/**
 * Jest configuration for the TypeScript + Puppeteer test suite.
 * @link https://jestjs.io/docs/configuration
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
  // Puppeteer 23+ ships ESM-only entry points; babel-jest converts them and
  // their ESM-only dependencies (puppeteer-core) to CommonJS so Jest can load them.
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    'node_modules/(puppeteer|puppeteer-core|@puppeteer/browsers)/': [
      'babel-jest',
      { plugins: ['@babel/plugin-transform-modules-commonjs'] },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!puppeteer|puppeteer-core|@puppeteer/browsers/)'],
};
