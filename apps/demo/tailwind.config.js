const {createThemes} = require('tw-colors')
const makeThemes = require('tailwindcss-themer')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {},
    extend: {},
  },
  plugins: [
    makeThemes({
      themes: [
        {
          name: 'alpha-light',
          extend: {
            colors: {
              primary: {
                500: 'purple',
              },
            },
          },
        },
        {
          name: 'alpha-dark',
          extend: {
            colors: {
              primary: {
                500: 'palevioletred',
              },
            },
          },
        },
      ],
    }),
  ],
}
