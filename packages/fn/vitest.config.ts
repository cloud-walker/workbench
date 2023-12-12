import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      all: true,
      functions: 50,
      branches: 90,
      lines: 90,
      statements: 90,
      include: ['src/**/*.ts'],
      skipFull: true,
    },
  },
})