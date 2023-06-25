import {defineConfig} from '@pandacss/dev'
import {preset} from './src/panda.preset'

export default defineConfig({
  presets: [preset],
  include: ['src/**/*.{ts,tsx,mdx}'],

  outdir: '@cloudwalker/styled-system',
  strictTokens: true,
  emitPackage: true,
})
