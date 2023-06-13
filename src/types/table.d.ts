type BaseTableCol<T> = {
  label: string
  getVal: (row: T) => import('react').ReactNode
  sortField?: keyof PickByType<T, string | number | Date>
  sortAscByDefault?: true
}
type TableCol<T> = BaseTableCol<T> & {
  filterField: false
}
type FilterableTableCol<T> = BaseTableCol<T> & ({
  filterType: 'text'
  filterField: keyof PickByType<T, string>
} | {
  filterType: 'select'
  filterField: keyof PickByType<T, string>
} | {
  filterType: 'date'
  filterField: keyof PickByType<T, Date>
})

type AnyTableCols<T> = (TableCol<T> | FilterableTableCol<T>)[]
