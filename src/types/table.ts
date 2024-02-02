import { ReactNode } from 'react'


export type BaseTableCol<T> = {
  label: string
  getVal: (row: T) => ReactNode
  sortField?: keyof PickByType<T, string | number | Date>
  sortAscByDefault?: true
}
export type TableCol<T> = BaseTableCol<T> & {
  filterField: false
}
export type FilterableTableCol<T> = BaseTableCol<T> & ({
  filterType: 'text'
  filterField: keyof PickByType<T, string>
} | {
  filterType: 'select'
  filterField: keyof PickByType<T, string>
} | {
  filterType: 'date'
  filterField: keyof PickByType<T, Date>
})

export type AnyTableCols<T> = (TableCol<T> | FilterableTableCol<T>)[]
