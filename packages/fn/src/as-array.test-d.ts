import {expectTypeOf, test} from 'vitest'

import type {asArray} from './as-array'

test('types work as expected', () => {
	type Subject<T = unknown> = ReturnType<typeof asArray<T>>

	// uknown -> unknown[]
	expectTypeOf<Subject<unknown>>().toEqualTypeOf<[unknown]>()

	// string -> string[]
	expectTypeOf<Subject<string>>().toEqualTypeOf<[string]>()

	// string | string[] -> string[]
	expectTypeOf<Subject<string | string[]>>().toEqualTypeOf<string[]>()

	// string | readonly string[] -> readonly string[]
	expectTypeOf<Subject<string | readonly string[]>>().toEqualTypeOf<
		readonly string[]
	>()

	// string | readonly [string] -> readonly [string]
	expectTypeOf<Subject<string | readonly [string]>>().toEqualTypeOf<
		readonly [string]
	>()
})
