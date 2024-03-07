import { useState } from 'react'
import './Table.css'
import Pagination from '@/components/Pagination'
import TableFilter from '@/layouts/Table/TableFilter'
import TableHead from '@/layouts/Table/TableHead'
import { UseQueryResult } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { AnyTableCols, BaseTableCol } from '@/types/table'


export type Props<T> = {
  cols: AnyTableCols<T>
  rows: T[]
  isFetching: boolean
  refetch: UseQueryResult['refetch']
  defaultSortField: NonNullable<BaseTableCol<T>['sortField']>
}

const Table = <T, >({ cols, rows, isFetching, refetch, defaultSortField }: Props<T>) => {
  const [pageRows, setPageRows] = useState([] as T[])
  const [filteredRows, setFilteredRows] = useState([] as T[])
  const [sortedRows, setSortedRows] = useState([] as T[])

  return (
    <>
      <div className='table-toolbar'>
        <TableFilter cols={cols} rows={rows} onChange={setFilteredRows} />
        <div>
          <button
            className='form-control'
            type='button'
            style={{ fontSize: 20 }}
            onClick={() => void refetch()}
          >
            ↻
          </button>
        </div>
      </div>
      <table className='w100'>
        <TableHead cols={cols} rows={filteredRows} defaultSortField={defaultSortField} onSortChange={setSortedRows} />
        {!isFetching &&
          <tbody>
            {pageRows.map((row, i) =>
              <tr key={i}>
                {cols.map(col =>
                  <td key={i + col.label}>{col.getVal(row)}</td>,
                )}
              </tr>,
            )}
          </tbody>
        }
      </table>
      {isFetching && <Loader />}
      <Pagination items={sortedRows} pageSize={15} onPageSet={setPageRows} />
    </>
  )
}

export default Table
