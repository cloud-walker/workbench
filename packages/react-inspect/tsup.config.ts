import {defineConfig} from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  minify: true,
  sourcemap: true,
  dts: true,
})
