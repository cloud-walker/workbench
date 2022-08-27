module.exports = {
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-react'],
  env: {node: true},
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {'react/prop-types': 'off'},
  settings: {
    react: {
      version: 'detect',
    },
  },
}
