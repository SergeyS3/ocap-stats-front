import { useEffect, useState } from 'react'
import './TableHead.css'
import { strCaseInsensitiveCompareFn } from '../../utils/string'
import { Props as TableProps } from './Table'


enum SortDirection {
  asc = '▲',
  desc = '▼',
}

type Props<T> = Pick<TableProps<T>, 'cols' | 'rows' | 'defaultSortField'> & {
  onSortChange: (sortedRows: T[]) => any
}

const TableHead = <T, >({ cols, rows, defaultSortField, onSortChange }: Props<T>) => {
  const [sort, setSort] = useState({
    field: defaultSortField,
    direction: cols.find(c => c.sortField === defaultSortField)?.sortAscByDefault
      ? SortDirection.asc
      : SortDirection.desc,
  })

  useEffect(() => {
    onSortChange(
      rows.slice().sort((a, b) => {
        const valA = a[sort.field]
        const valB = b[sort.field]
        const res = typeof valA === 'string' ? strCaseInsensitiveCompareFn(valA, valB as typeof valA) : +valA - +valB

        return sort.direction === SortDirection.desc ? res * -1 : res
      }),
    )
  }, [sort, rows])

  return (
    <thead>
      <tr>
        {cols.map(col => {
          const isColSortActive = sort.field === col.sortField
          const setColSortActive = (direction: SortDirection) => setSort({ field: col.sortField, direction })

          return (
            <th key={col.label}>
              {col.sortField
                ? <>
                  <span
                    onClick={() => setColSortActive(
                      (isColSortActive ? sort.direction === SortDirection.desc : col.sortAscByDefault)
                        ? SortDirection.asc
                        : SortDirection.desc,
                    )}
                  >
                    {col.label}
                  </span>
                  {Object.values(SortDirection).map(sortDirection =>
                    <button
                      key={sortDirection}
                      className={isColSortActive && sort.direction === sortDirection ? 'active' : ''}
                      onClick={() => setColSortActive(sortDirection)}
                    >
                      {sortDirection}
                    </button>,
                  )}
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
