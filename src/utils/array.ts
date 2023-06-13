export const arrayChunk = <T extends any[]>(arr: T, chunkSize: number): T[] => {
  const chunks = []
  for (let i = 0; i < arr.length; i += chunkSize)
    chunks.push(arr.slice(i, i + chunkSize) as T)

  return chunks
}

export const arrayUniqueStrsCaseInsensitive = <T extends string>(arr: T[]): T[] =>
  Object.values(Object.fromEntries(arr.map(s => [s.toLowerCase(), s])))

export const tableColWithFilterPredicate = <T>(c: AnyTableCols<T>[0]): c is FilterableTableCol<T> => !!c.filterField
