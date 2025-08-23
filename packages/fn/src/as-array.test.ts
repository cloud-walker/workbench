import {expectTypeOf, test} from 'vitest'
import {asArray} from './as-array'

test('types work as expected', () => {
	const a = asArray('foo')
	expectTypeOf(a).toEqualTypeOf<'foo'[]>()

	const b = asArray(['foo'])
	expectTypeOf(b).toEqualTypeOf<'foo'[]>()

	const c = asArray(123)
	expectTypeOf(c).toEqualTypeOf<123[]>()
})
