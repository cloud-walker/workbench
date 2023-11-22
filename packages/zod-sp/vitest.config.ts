import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      functions: 90,
      branches: 90,
      lines: 90,
      statements: 90,
      include: ['src/**/*.ts'],
      skipFull: true,
    },
  },
})
