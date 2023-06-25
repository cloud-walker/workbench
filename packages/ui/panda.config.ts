import {defineConfig} from '@pandacss/dev'

export default defineConfig({
  emitPackage: true,
  outdir: 'style-engine',
  presets: ['./src/panda.preset.ts'],
})
