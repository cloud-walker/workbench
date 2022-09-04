import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

const COVERAGE_THRESHOLD = 100

export default defineConfig({
  plugins: [react],
  test: {
    environment: 'happy-dom',
    coverage: {
      all: true,
      functions: COVERAGE_THRESHOLD,
      branches: COVERAGE_THRESHOLD,
      lines: COVERAGE_THRESHOLD,
      statements: COVERAGE_THRESHOLD,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      skipFull: true,
    },
  },
})
