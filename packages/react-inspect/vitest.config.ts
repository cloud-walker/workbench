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
        functions: 92.85,
        branches: 91.07,
        lines: 97.87,
        statements: 97.87,
        autoUpdate: true,
      },
    },
  },
})