import {defineConfig} from 'tsup'

export default defineConfig({
	format: ['cjs', 'esm'],
	minify: true,
	sourcemap: true,
	dts: true,
})
