module.exports = {
  root: true,
  overrides: [
    {
      files: ['src/**/*.js'],
      parser: '@babel/eslint-parser',
      extends: ['eslint:recommended', 'plugin:react/recommended'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['src/**/*.stories.js', 'src/**/*.test.js'],
      env: {node: true},
    },
  ],
}
