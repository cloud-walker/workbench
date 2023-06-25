import {definePreset} from '@pandacss/dev'

export const preset = definePreset({
  theme: {
    tokens: {
      colors: {
        primary: {value: 'red'},
        secondary: {value: 'green'},
      },
    },
  },
})
