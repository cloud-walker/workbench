import {defineConfig} from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  minify: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
  },
})
