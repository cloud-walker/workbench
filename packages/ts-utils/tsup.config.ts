import {defineConfig} from 'tsup'

export default defineConfig({
	format: ['cjs', 'esm'],
	dts: true,
	minify: true,
	sourcemap: true,
})
