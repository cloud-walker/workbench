export const zodSp = {
  parse() { },
  serialize() { },
  with() {
    const parse = this.parse
    const serialize = () => { }
    return { parse, serialize } as const
  }
} as const
