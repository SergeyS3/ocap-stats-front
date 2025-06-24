export const strCaseInsensitiveCompareFn = <T extends string>(a: T, b: T): number =>
  a.toLowerCase().localeCompare(b.toLowerCase())

export const strIncludesCaseInsensitive = (str: string, substr: string): boolean =>
  str.toLowerCase().includes(substr.toLowerCase())

export type MakeUrlParams = Record<string, string | number | boolean>

export const makeUrl = (path: string, params?: MakeUrlParams): string => {
  if (params)
    // @ts-expect-error https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1568
    path += '?' + new URLSearchParams(params).toString()

  return path
}

export const prepareRouteParam = (str: string): string => str.replace('/', '%2F').replace('\\', '%5C')
