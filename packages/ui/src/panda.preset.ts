import {definePreset} from '@pandacss/dev'

export const preset = definePreset({
	name: 'cloudwalker',
	theme: {
		tokens: {
			colors: {
				primary: {value: 'red'},
				secondary: {value: 'green'},
			},
		},
	},
})
