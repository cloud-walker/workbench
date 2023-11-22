import {describe, expect, test} from 'vitest'
import {z} from 'zod'

import {zodSp} from './main.js'

const ISO_DATE_STUB = '2023-11-22T07:32:03.889Z'

test.each([
  {input: '', expected: {}},
  {input: 'a=1', expected: {a: '1'}},
  {input: 'a=true', expected: {a: 'true'}},
  {input: 'a=asd', expected: {a: 'asd'}},
  {input: 'a=1&b=foo&b=bar', expected: {a: '1', b: 'bar'}},
  {input: 'a=1&b=foo,bar', expected: {a: '1', b: 'foo,bar'}},
  {input: 'a=1&b[]=foo,bar', expected: {a: '1', b: ['foo', 'bar']}},
])('.parse($input) -> $expected', ({input, expected}) => {
  expect(zodSp.parse(new URLSearchParams(input))).toEqual(expected)
})

test.each([
  {input: {}, expected: ''},
  {input: {a: 1}, expected: 'a=1'},
  {input: {a: true}, expected: 'a=true'},
  {input: {a: 'asd'}, expected: 'a=asd'},
  {input: {a: 1, b: ['foo', 'bar']}, expected: 'a=1&b%5B%5D=foo%2Cbar'},
  {input: {a: 1, b: null, c: undefined}, expected: 'a=1'},
  {
    input: {
      a: 1,
      b: new Date(ISO_DATE_STUB),
      c: [new Date(ISO_DATE_STUB), new Date(ISO_DATE_STUB)],
    },
    expected: `a=1&b=${encodeURIComponent(
      ISO_DATE_STUB,
    )}&c%5B%5D=${encodeURIComponent(`${ISO_DATE_STUB},${ISO_DATE_STUB}`)}`,
  },
])('.serialize($input) -> $expected', ({input, expected}) => {
  expect(zodSp.serialize(input).toString()).toBe(expected)
})

describe('.with(ZodSchema)', () => {
  const defaultTuple: [string, number] = ['default', 0]
  const ZodSchema = z.object({
    a: z.string().optional(),
    b: z.coerce.number().optional(),
    c: z.coerce.boolean().default(false),
    d: z.array(z.coerce.date()).optional(),
    e: z.tuple([z.string(), z.coerce.number()]).catch(() => defaultTuple),
    f: z.coerce.date().optional(),
  })
  const dummySp = zodSp.with(ZodSchema)

  test.each([
    {input: '', expected: {c: false, e: defaultTuple}},
    {
      input: 'c=true&a=123&e[]=foo,123',
      expected: {a: '123', c: true, e: ['foo', 123]},
    },
    {
      input: 'c=true&a=123&e[]=foo,123',
      expected: {a: '123', c: true, e: ['foo', 123]},
    },
    {
      input: zodSp.serialize({
        d: [new Date(ISO_DATE_STUB), new Date(ISO_DATE_STUB)],
      }),
      expected: {
        c: false,
        d: [new Date(ISO_DATE_STUB), new Date(ISO_DATE_STUB)],
        e: ['default', 0],
      },
    },
  ])('.parse($input) -> $expected', ({input, expected}) => {
    expect(dummySp.parse(new URLSearchParams(input))).toEqual(expected)
  })
})
