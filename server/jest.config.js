module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx)",
    "**/?(*.)+(spec|test).+(ts|tsx)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};