module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
}
