export function pick<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  data: T,
  keys: readonly K[],
): Pick<T, K> {
  return Object.entries(data).reduce<Record<PropertyKey, unknown>>(
    (acc, [key, value]) => {
      if (keys.find((k) => k == key)) {
        acc[key] = value
      }
      return acc
    },
    {},
  ) as Pick<T, K>
}
