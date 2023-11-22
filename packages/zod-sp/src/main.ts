import { ZodObject, ZodRawShape, TypeOf } from 'zod'

export const zodSp = {
  parse(searchParams: URLSearchParams): Record<string, string | string[]> {
    return [...searchParams.entries()].reduce<Record<string, string | string[]>>((acc, [key, value]) => {
      // if (value == null) {
      //   return acc
      // }

      if (key.endsWith('[]')) {
        acc[key.replace('[]', '')] = value.split(',')
      } else {
        acc[key] = value
      }
      return acc
    }, {})
  },
  serialize<T extends Record<string, unknown>>(params: T): URLSearchParams {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value == null) {
        return
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(`${key}[]`, value.map(v => {
            const serialized = v instanceof Date ? v.toISOString() : String(v)
            return serialized
          }).join(','))
        }
        return
      }

      const serialized = value instanceof Date ? value.toISOString() : String(value)

      searchParams.set(key, serialized)
    })
    return searchParams
  },
  with<Z extends ZodObject<ZodRawShape>>(schema: Z) {
    type T = TypeOf<Z>
    const parse = (searchParams: URLSearchParams): T => {
      const parsed = this.parse(searchParams)
      console.log(parsed)
      return schema.parse(parsed)
    }
    const serialize = this.serialize
    return { parse, serialize } as const
  }
} as const
