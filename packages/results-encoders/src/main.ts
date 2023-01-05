import {F} from 'ts-toolbelt'

export function makeResultsEncoders<TResult extends {[k in string]: unknown}>({
  fieldsEncodings,
}: {
  fieldsEncodings: {readonly [k in keyof TResult]?: string}
}) {
  type FieldEncodings = typeof fieldsEncodings
  type Field = keyof FieldEncodings
  const fieldsEncodingInverted = recordReverse(fieldsEncodings)

  const resultsFilters = makeResultsFiltersEncoder()
  const resultsSortings = makeResultsSortingsEncoder()
  const fieldsFilters = makeFieldsFiltersEncoder()
  const fieldsSortings = {
    encode: (fields: readonly Field[]): string =>
      fields.map((f) => fieldsEncodings[f]).join(','),
    decode: (encoding: string): Field[] =>
      encoding == ''
        ? []
        : encoding.split(',').map((frag) => fieldsEncodingInverted[frag]),
  }

  return {
    resultsFilters,
    resultsSortings,
    fieldsFilters,
    fieldsSortings,
  }
}

function makeResultsFiltersEncoder() {
  return {encode: true, decode: true}
}

function makeResultsSortingsEncoder() {
  return {encode: true, decode: true}
}

function makeFieldsFiltersEncoder() {
  return {encode: true, decode: true}
}

function makeFieldsSortingsEncoder() {
  return {encode: true, decode: true}
}

function recordReverse<TRecord extends {readonly [k in string]?: string}>(
  record: F.Narrow<TRecord>,
) {
  return Object.fromEntries(Object.entries(record).map(([k, v]) => [v, k])) as {
    [K in keyof TRecord as NonNullable<TRecord[K]>]: K
  }
}

const foo = {a: 'A', b: 'B'} as const
const bar = recordReverse(foo)
