export function makeResultsEncoders<TResult extends Record<string, unknown>>() {
  type Field = keyof TResult

  const resultsFilters = {encode: true, decode: true}
  const resultsSortings = {encode: true, decode: true}
  const fieldsFilters = {encode: true, decode: true}
  const fieldsSortings = {encode: true, decode: true}

  return {
    resultsFilters,
    resultsSortings,
    fieldsFilters,
    fieldsSortings,
  }
}
