const makeThemes = require('tailwindcss-themer')
const colors = require('@radix-ui/colors')
const R = require('remeda')

/**
 * @param {string} toStrip
 */
const strip = (toStrip) => {
  /**
   * @param {string} value
   */
  const strippifier = (value) => value.replace(toStrip, '')
  return strippifier
}
/**
 *
 * @param {Record<string, unknown>} color
 * @param {string} toStrip
 */
const parseRadixColor = (color, toStrip) => R.mapKeys(color, strip(toStrip))

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
              gray: parseRadixColor(colors.slate, 'slate'),
              neutral: parseRadixColor(colors.slate, 'slate'),
              primary: parseRadixColor(colors.violet, 'violet'),
              success: parseRadixColor(colors.teal, 'teal'),
              notice: parseRadixColor(colors.yellow, 'yellow'),
              critical: parseRadixColor(colors.red, 'red'),
            },
          },
        },
        {
          name: 'alpha-dark',
          extend: {
            colors: {
              gray: parseRadixColor(colors.slate, 'slate'),
              neutral: parseRadixColor(colors.slateDark, 'slate'),
              primary: parseRadixColor(colors.violetDark, 'violet'),
              success: parseRadixColor(colors.tealDark, 'teal'),
              notice: parseRadixColor(colors.yellowDark, 'yellow'),
              critical: parseRadixColor(colors.redDark, 'red'),
            },
          },
        },
        {
          name: 'beta-light',
          extend: {
            colors: {
              gray: parseRadixColor(colors.olive, 'olive'),
              neutral: parseRadixColor(colors.olive, 'olive'),
              primary: parseRadixColor(colors.cyan, 'cyan'),
              success: parseRadixColor(colors.grass, 'grass'),
              notice: parseRadixColor(colors.yellow, 'yellow'),
              critical: parseRadixColor(colors.tomato, 'tomato'),
            },
          },
        },
        {
          name: 'beta-dark',
          extend: {
            colors: {
              gray: parseRadixColor(colors.olive, 'olive'),
              neutral: parseRadixColor(colors.oliveDark, 'olive'),
              primary: parseRadixColor(colors.cyanDark, 'cyan'),
              success: parseRadixColor(colors.grassDark, 'grass'),
              notice: parseRadixColor(colors.yellowDark, 'yellow'),
              critical: parseRadixColor(colors.tomatoDark, 'tomato'),
            },
          },
        },
      ],
    }),
  ],
}
