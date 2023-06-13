import { useState } from 'react'
import './Table.css'
import Pagination from '../../components/Pagination'
import TableFilter from './TableFilter'
import TableHead from './TableHead'


export type Props<T> = {
  cols: AnyTableCols<T>
  rows: T[]
  defaultSortField: NonNullable<BaseTableCol<T>['sortField']>
}

const Table = <T, >({ cols, rows, defaultSortField }: Props<T>) => {
  const [pageRows, setPageRows] = useState([] as T[])
  const [filteredRows, setFilteredRows] = useState([] as T[])
  const [sortedRows, setSortedRows] = useState([] as T[])

  return (
    <>
      <TableFilter cols={cols} rows={rows} onChange={setFilteredRows} />
      <table>
        <TableHead cols={cols} rows={filteredRows} defaultSortField={defaultSortField} onSortChange={setSortedRows} />
        <tbody>
          {pageRows.map((row, i) =>
            <tr key={i}>
              {cols.map(col =>
                <td key={i + col.label}>{col.getVal(row)}</td>,
              )}
            </tr>,
          )}
        </tbody>
      </table>
      <Pagination items={sortedRows} pageSize={20} onPageSet={setPageRows} />
    </>
  )
}

export default Table
