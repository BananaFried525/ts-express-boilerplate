module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/test'],
  // setupFiles: ["dotenv/config"],
  // globalSetup: '<rootDir>/src/test/global-setup.ts',
  // globalTeardown: '<rootDir>/src/test/global-teardown.ts',
  // setupFilesAfterEnv: ['<rootDir>/src/test/redis-mock.ts', 'jest-expect-message'],
};