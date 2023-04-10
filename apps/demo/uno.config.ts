import {char, createRegExp, digit, exactly, oneOrMore} from 'magic-regexp'
import {defineConfig} from 'unocss'
import {z} from 'zod'

const spacingKey = z.enum(['none', 'unit', '1', '2', '4'])
type spacingKey = z.infer<typeof spacingKey>
const spacing = {
  none: '0',
  unit: '0.0625rem',
  '1': '0.25rem',
  '2': '0.5rem',
  '4': '1rem',
} as const satisfies Record<spacingKey, string>

const semver = createRegExp(
  oneOrMore(digit)
    .groupedAs('major')
    .and('.')
    .and(oneOrMore(digit).groupedAs('minor'))
    .and(exactly('.').and(oneOrMore(char).groupedAs('patch')).optionally()),
)

const foo = semver.exec('4.5.1')

const alphaTheme = {
  color: {
    primary: {
      '25': 'red',
      '50': 'red',
      '100': 'red',
      '200': 'red',
      '300': 'red',
      '400': 'red',
      '500': 'red',
      '600': 'red',
      '700': 'red',
      '800': 'red',
      '900': 'red',
    },
  },
  opacity: {
    1: '0.08',
    2: '0.16',
    3: '0.24',
    5: '0.4',
    8: '0.64',
  },
} as const

export default defineConfig({
  theme: {
    alpha: alphaTheme,
  },
  rules: [
    ['flex', {display: 'flex'}],
    ['flex-col', {'flex-direction': 'column'}],
    ['mx-auto', {'margin-inline': 'auto'}],
    ['gap-2', {gap: spacing[2]}, {autocomplete: 'gap-2'}],
    ['text-primary-500', {color: 'rgb(var(--color-primary-500))'}],
  ],
  preflights: [
    {
      getCSS: () => `
        * {
            box-sizing: border-box;
        }

        h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
            font-weight: inherit;
        }
        `,
    },
  ],
})
