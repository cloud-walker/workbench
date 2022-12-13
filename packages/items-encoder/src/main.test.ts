import {expect, test} from 'vitest'
import {
  decodeResultsSortings,
  encodeResultsSortings,
  makeResultsSortingsEncoder,
} from './main'

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

test('tasks results sortings encode / decode', () => {
  type Task = {
    id: string
    content: string
    categories: string[]
    isCompleted: boolean
    estimate: number
    createdAt: Date
    updatedAt: Date
  }
  const encoder = makeResultsSortingsEncoder<Record<keyof Task, string>>({
    categories: 'cg',
    content: 'cn',
    createdAt: 'ca',
    estimate: 'es',
    id: 'id',
    isCompleted: 'ic',
    updatedAt: 'ua',
  })

  {
    const decoded = encoder.decode('')
    expect(decoded).toEqual([])
  }

  {
    const decoded = encoder.decode('id:a,cg:d,es:a')
    expect(decoded).toEqual([
      {field: 'id', operator: 'asc'},
      {field: 'categories', operator: 'desc'},
      {field: 'estimate', operator: 'asc'},
    ])
  }

  expect(encoder.encode([])).toBe('')
  expect(
    encoder.encode([
      {field: 'id', operator: 'asc'},
      {field: 'categories', operator: 'desc'},
      {field: 'estimate', operator: 'asc'},
    ]),
  ).toBe('id:a,cg:d,es:a')
})
