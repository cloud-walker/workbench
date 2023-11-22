import {TypeOf, ZodObject, ZodRawShape} from 'zod'

const serializeValue = (value: {}) =>
  value instanceof Date ? value.toISOString() : String(value)

type RawParams = Record<string, string | string[]>

export const zodSp = {
  parse(searchParams: URLSearchParams): RawParams {
    return [...searchParams.entries()].reduce<RawParams>(
      (acc, [key, value]) => {
        if (key.endsWith('[]')) {
          acc[key.replace('[]', '')] = value.split(',')
        } else {
          acc[key] = value
        }
        return acc
      },
      {},
    )
  },
  serialize<T extends Record<string, unknown>>(params: T): URLSearchParams {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value == null) {
        return
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(`${key}[]`, value.map(serializeValue).join(','))
        }
        return
      }

      searchParams.set(key, serializeValue(value))
    })
    return searchParams
  },
  with<Z extends ZodObject<ZodRawShape>>(schema: Z) {
    type T = TypeOf<Z>
    const parse = (searchParams: URLSearchParams): T => {
      const parsed = this.parse(searchParams)
      return schema.parse(parsed)
    }
    const serialize = this.serialize
    return {parse, serialize} as const
  },
} as const
