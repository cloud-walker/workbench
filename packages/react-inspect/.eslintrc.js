module.exports = {
  root: true,
  overrides: [
    {
      files: ['./*.js'],
      extends: ['eslint:recommended'],
      env: {node: true},
    },
    {
      files: ['src/**/*.{js,jsx}'],
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
      files: ['src/**/*.stories.js', 'src/**/*.test.{js,jsx}'],
      env: {node: true},
    },
  ],
}
