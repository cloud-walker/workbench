import {defineConfig} from 'tsup'

export default defineConfig({
  external: ['@cloudwalker/styled-system'],
  format: ['cjs', 'esm'],
  entry: ['src/main.ts', 'src/panda.preset.ts'],
  dts: true,
  minify: true,
  sourcemap: true,
})
