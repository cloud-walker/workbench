import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    coverage: {
      all: true,
      functions: 50,
      branches: 90,
      lines: 90,
      statements: 90,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/**/testUtils.ts'],
      skipFull: true,
    },
  },
})
