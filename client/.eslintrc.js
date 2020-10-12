module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',               // eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // @typescript-eslint/eslint-plugin
  ],
  plugins: [
    'react'
  ],
  parserOptions: {
    ecmaVersion: 2020,                        // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',                     // Allows for the use of imports
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,                              // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-use-before-define': 'off',                        // Disable eslint base rule.
    '@typescript-eslint/no-use-before-define': ['error'], // Enable TS rule.
    'max-len': ['error', { 'code': 100 }]                 // Max line length.
},
  settings: {
    react: {
      version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};