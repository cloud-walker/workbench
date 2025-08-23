import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'happy-dom',
		coverage: {
			all: true,
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: ['src/**/*.stories.tsx', 'src/**/testUtils.ts'],
			skipFull: true,
			thresholds: {
				functions: 92,
				branches: 91,
				lines: 97,
				statements: 97,
			},
		},
	},
})
