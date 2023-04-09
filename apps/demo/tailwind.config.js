const {createThemes} = require('tw-colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      'alpha-light': {
        primary: 'steelblue',
      },
      'alpha-dark': {
        primary: 'darkblue',
      },
      'beta-light': {},
      'beta-dark': {},
    }),
  ],
}
