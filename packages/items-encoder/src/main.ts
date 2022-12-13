import {pipe, reduce} from 'remeda'
import {z} from 'zod'

type ResultSorting<TField extends string = string> = {
  field: TField
  operator: 'asc' | 'desc'
}

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

export function makeResultsSortingsEncoder<
  TFieldsMap extends Readonly<Record<string, string>>,
>(fieldsMap: TFieldsMap) {
  type Field = Extract<keyof TFieldsMap, string>
  const encodings = Object.values(fieldsMap) as unknown as ReadonlyArray<
    TFieldsMap[keyof TFieldsMap]
  >
  const fieldsBiMap = makeBiMap(fieldsMap)
  const encode = (data: ResultSorting<Field>[]): string =>
    data.reduce((acc, x) => {
      const frag = `${fieldsBiMap.value(x.field)}:${decodedOperatorSchema.parse(
        x.operator,
      )}`
      if (acc == '') {
        return frag
      }
      return `${acc},${frag}`
    }, '')
  const decode = (data: string): ResultSorting<Field>[] => {
    if (data == '') {
      return []
    }
    return data.split(',').map((s) => {
      const [_field, _operator] = s.split(':')
      const operator = encodedOperatorSchema.parse(_operator)
      const field = fieldsBiMap.key(
        z
          .enum(
            /** @ts-ignore-next */
            encodings,
          )
          .parse(_field) as TFieldsMap[Field],
      ) as Field
      return {
        field,
        operator,
      }
    })
  }

  return {encode, decode} as const
}

function makeBiMap<TData extends Readonly<Record<string, string>>>(
  data: TData,
) {
  type Key = Extract<keyof TData, string>
  type Value = TData[Key]
  const inverseData = Object.fromEntries(
    Object.entries(data).map(([a, b]) => [b, a]),
  ) as {[k in keyof TData as TData[k]]: k}
  const key = (value: Value) => inverseData[value]
  const value = (key: Key) => data[key]
  return {key, value} as const
}
