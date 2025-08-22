import {definePreset} from '@pandacss/dev'
import type {Preset} from '@pandacss/types'

export const preset = definePreset({
	theme: {
		tokens: {
			colors: {
				primary: {value: 'red'},
				secondary: {value: 'green'},
			},
		},
	},
}) as Preset
