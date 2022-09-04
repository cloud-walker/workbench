export const und = undefined
export const nil = null
export const num = 666
export const str = 'cawabongaaa!'
export const fun = (a: number) => {
  const b = 2

  while (a < 10) {
    a++
  }

  return a + b
}
const baseObj = {und, nil, num, str, fun}
export const arr = Object.values(baseObj)

export const data = {
  ...baseObj,
  arr,
  obj: {...baseObj},
}

class Circ {
  foo: string
  circ: unknown
  constructor() {
    this.foo = 'bar'
    this.circ = this
  }
}

export const circ = new Circ()
