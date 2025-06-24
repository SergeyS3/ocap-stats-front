import { AnyTableCols, FilterableTableCol } from '@/types/table'


export const arrayChunk = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunks = []
  for (let i = 0; i < arr.length; i += chunkSize)
    chunks.push(arr.slice(i, i + chunkSize))

  return chunks
}

export const arrayUniqueStrsCaseInsensitive = <T extends string>(arr: T[]): T[] =>
  Object.values(Object.fromEntries(arr.map(s => [s.toLowerCase(), s])))

export const tableColWithFilterPredicate = <T>(c: AnyTableCols<T>[0]): c is FilterableTableCol<T> => !!c.filterField
