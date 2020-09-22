module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,    // Parse modern ECMAScript features
    sourceType: 'module', // Use of imports
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never' // Inactivate airbnb eslint on file extensions in import declarations
      }
   ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts']  // No need to specify file extension in import declarations
      }
    }
  }
};
