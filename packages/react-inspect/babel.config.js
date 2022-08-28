module.exports = {
  presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {targets: {node: true}}],
        '@babel/preset-react',
      ],
    },
  },
}