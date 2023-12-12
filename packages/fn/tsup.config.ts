import {defineConfig} from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['src/main.ts'],
  sourcemap: true,
  dts: true,
})
