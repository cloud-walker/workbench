const makeThemes = require('tailwindcss-themer')
const {
  violet,
  violetDark,
  tealDark,
  teal,
  slate,
  slateDark,
  yellow,
  yellowDark,
  crimson,
  crimsonDark,
  olive,
  oliveDark,
  cyan,
  cyanDark,
  grass,
  grassDark,
  tomato,
  tomatoDark,
  red,
  redDark,
} = require('@radix-ui/colors')
const {mapKeys} = require('remeda')

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
              neutral: mapKeys(slate, (k) => k.replace('slate', '')),
              primary: mapKeys(violet, (k) => k.replace('violet', '')),
              success: mapKeys(teal, (k) => k.replace('teal', '')),
              notice: mapKeys(yellow, (k) => k.replace('yellow', '')),
              critical: mapKeys(red, (k) => k.replace('red', '')),
            },
          },
        },
        {
          name: 'alpha-dark',
          extend: {
            colors: {
              neutral: mapKeys(slateDark, (k) => k.replace('slate', '')),
              primary: mapKeys(violetDark, (k) => k.replace('violet', '')),
              success: mapKeys(tealDark, (k) => k.replace('teal', '')),
              notice: mapKeys(yellowDark, (k) => k.replace('yellow', '')),
              critical: mapKeys(redDark, (k) => k.replace('red', '')),
            },
          },
        },
        {
          name: 'beta-light',
          extend: {
            colors: {
              neutral: mapKeys(olive, (k) => k.replace('olive', '')),
              primary: mapKeys(cyan, (k) => k.replace('cyan', '')),
              success: mapKeys(grass, (k) => k.replace('grass', '')),
              notice: mapKeys(yellow, (k) => k.replace('yellow', '')),
              critical: mapKeys(tomato, (k) => k.replace('tomato', '')),
            },
          },
        },
        {
          name: 'beta-dark',
          extend: {
            colors: {
              neutral: mapKeys(oliveDark, (k) => k.replace('olive', '')),
              primary: mapKeys(cyanDark, (k) => k.replace('cyan', '')),
              success: mapKeys(grassDark, (k) => k.replace('grass', '')),
              notice: mapKeys(yellowDark, (k) => k.replace('yellow', '')),
              critical: mapKeys(tomatoDark, (k) => k.replace('tomato', '')),
            },
          },
        },
      ],
    }),
  ],
}
