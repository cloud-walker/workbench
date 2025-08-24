import {defineConfig} from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		typecheck: {
			enabled: true,
		},
		coverage: {
			all: true,
			thresholds: {
				functions: 0,
				branches: 0,
				lines: 0,
				statements: 0,
			},
			include: ['src/**/*.ts'],
			skipFull: true,
		},
	},
})
