import {pipe, reduce} from 'remeda'
import {z} from 'zod'

type ResultSorting = {field: string; operator: 'asc' | 'desc'}

const encodedOperatorSchema = z.union([
  z.literal('a').transform(() => 'asc' as const),
  z.literal('d').transform(() => 'desc' as const),
])

const decodedOperatorSchema = z.union([
  z.literal('asc').transform(() => 'a' as const),
  z.literal('desc').transform(() => 'd' as const),
])
const decodedSortingSchema = z.object({
  operator: decodedOperatorSchema,
  field: z.string().min(1),
})

const sortingOperatorSchema = z.literal('asc').or(z.literal('desc'))

export function encodeResultsSortings(data: ReadonlyArray<ResultSorting>) {
  return pipe(
    data,
    reduce((acc, x) => {
      const {operator, field} = decodedSortingSchema.parse(x)
      if (acc == '') {
        return `${field}:${operator}`
      }
      return `${acc},${field}:${operator}`
    }, ''),
  )
}

export function decodeResultsSortings(data: string): ResultSorting[] {
  if (data == '') {
    return []
  }
  return data.split(',').map((s) => {
    const [field, rawOperator] = s.split(':')
    const operator = encodedOperatorSchema.parse(rawOperator)
    return {field, operator}
  })
}

export function makeResultsSortingsEncoder() {
  const encode = () => {}
  const decode = () => {}

  return {encode, decode} as const
}
