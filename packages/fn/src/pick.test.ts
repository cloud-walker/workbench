import {expect, test} from 'vitest'
import {pick} from './pick'

test('pick', () => {
  expect(pick({a: 1, b: 2, c: 3}, ['a'])).toEqual({a: 1})
})
