module.exports = {
  root: true,
  overrides: [
    {
      files: ['./*.js'],
      extends: ['eslint:recommended'],
      env: {node: true},
    },
    {
      files: ['src/**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/array-type': 'warn',
      },
    },
    {
      files: ['src/**/*.stories.js', 'src/**/*.test.{js,jsx}'],
      env: {node: true},
    },
  ],
}
