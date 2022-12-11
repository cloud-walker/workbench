import {expect, test} from 'vitest'
import {decodeResultsSortings, encodeResultsSortings} from './main'

test('encode results sortings', () => {
  expect(
    encodeResultsSortings([
      {field: 'foo', operator: 'asc'},
      {field: 'bar', operator: 'desc'},
      {field: 'baz', operator: 'asc'},
    ]),
  ).toBe('foo:a,bar:d,baz:a')
})

test('decode results sortings', () => {
  expect(decodeResultsSortings('')).toEqual([])
  expect(decodeResultsSortings('foo:a,bar:d,baz:a')).toEqual([
    {field: 'foo', operator: 'asc'},
    {field: 'bar', operator: 'desc'},
    {field: 'baz', operator: 'asc'},
  ])
})
