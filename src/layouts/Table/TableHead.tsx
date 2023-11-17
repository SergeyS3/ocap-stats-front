import { useEffect, useState } from 'react'
import './TableHead.css'
import { strCaseInsensitiveCompareFn } from '@/utils/string'
import type { Props as TableProps } from '@/layouts/Table/Table'


type Props<T> = Pick<TableProps<T>, 'cols' | 'rows' | 'defaultSortField'> & {
  onSortChange: (sortedRows: T[]) => any
}

const TableHead = <T, >({ cols, rows, defaultSortField, onSortChange }: Props<T>) => {
  const [sort, setSort] = useState({
    field: defaultSortField,
    asc: !!cols.find(c => c.sortField === defaultSortField)?.sortAscByDefault,
  })

  useEffect(() => {
    onSortChange(
      [...rows].sort((a, b) => {
        const valA = a[sort.field]
        const valB = b[sort.field]
        const res = typeof valA === 'string' ? strCaseInsensitiveCompareFn(valA, valB as typeof valA) : +valA - +valB

        return sort.asc ? res : res * -1
      }),
    )
  }, [onSortChange, rows, sort])

  return (
    <thead>
      <tr>
        {cols.map(col => {
          const isColSortActive = sort.field === col.sortField
          const setColSort = (asc: boolean) => setSort({ field: col.sortField as typeof sort.field, asc })

          return (
            <th key={col.label}>
              {col.sortField
                ? <>
                  <span onClick={() => setColSort(isColSortActive ? !sort.asc : !!col.sortAscByDefault)}>
                    {col.label}
                  </span>
                  <button disabled={isColSortActive && sort.asc} onClick={() => setColSort(true)}>▲</button>
                  <button disabled={isColSortActive && !sort.asc} onClick={() => setColSort(false)}>▼</button>
                </>
                : col.label
              }
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHead
