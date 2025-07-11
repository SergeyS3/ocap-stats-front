import { arrayUniqueStrsCaseInsensitive, tableColWithFilterPredicate } from '@/utils/array'
import { strCaseInsensitiveCompareFn, strIncludesCaseInsensitive } from '@/utils/string'
import { JSX, useEffect, useMemo, useState } from 'react'
import { Props as HorizontalTableProps } from '@/layouts/tables/horizontal/HorizontalTable'
import './HorizontalTableFilter.css'
import { FilterableTableCol } from '@/types/table'


type Filter<T> = Record<FilterableTableCol<T>['filterField'], string>

type Props<T> = Pick<HorizontalTableProps<T>, 'cols' | 'rows'> & {
  onChange: (filteredRows: T[]) => unknown
}

const HorizontalTableFilter = <T, >({ cols, rows, onChange }: Props<T>) => {
  const [filter, setFilter] = useState({} as Filter<T>)

  const colsWithFilter = useMemo(() => cols.filter(tableColWithFilterPredicate), [cols])

  useEffect(() => {
    onChange(
      rows.filter(row =>
        colsWithFilter.every(({ filterField, filterType }) => {
          const rowVal = row[filterField]
          const filterVal = filter[filterField]
          if (!filterVal)
            return true

          switch (filterType) {
            case 'text':
              return strIncludesCaseInsensitive(rowVal as string, filterVal)
            case 'select':
              return rowVal === filterVal
            case 'date':
              return (rowVal as Date).toISOString().startsWith(filterVal)
          }

          return true
        }),
      ),
    )
  }, [onChange, rows, filter, colsWithFilter])

  return (
    <div className='table-filter'>
      {colsWithFilter.map(col =>
        <label key={col.label}>
          {col.label}:
          {(() => {
            const commonProps: JSX.IntrinsicElements['input'] & JSX.IntrinsicElements['select'] = {
              className: 'form-control',
              onChange: e => setFilter({ ...filter, [col.filterField]: e.target.value }),
              value: filter[col.filterField] || '',
            }

            switch (col.filterType) {
              case 'text':
                return <input type='text' {...commonProps} />
              case 'select':
                return (
                  <select {...commonProps}>
                    <option value='' />
                    {arrayUniqueStrsCaseInsensitive(rows.map(row => row[col.filterField] as string))
                      .sort(strCaseInsensitiveCompareFn)
                      .map(map =>
                        <option key={map} value={map}>{map}</option>,
                      )
                    }
                  </select>
                )
              case 'date':
                return <input type='date' {...commonProps} />
            }
          })()}
        </label>,
      )}
      {!!colsWithFilter.length &&
        <button className='form-control' type='button' onClick={() => setFilter({} as Filter<T>)}>Сбросить</button>
      }
    </div>
  )
}

export default HorizontalTableFilter
