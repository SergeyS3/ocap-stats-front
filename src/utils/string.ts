export const strCaseInsensitiveCompareFn = <T extends string>(a: T, b: T): number =>
  a.toLowerCase().localeCompare(b.toLowerCase())

export const strIncludesCaseInsensitive = (str: string, substr: string) =>
  str.toLowerCase().includes(substr.toLowerCase())
