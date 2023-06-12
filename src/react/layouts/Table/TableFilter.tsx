import { arrayUniqueStrsCaseInsensitive, tableColWithFilterPredicate } from '../../utils/array'
import { strCaseInsensitiveCompareFn, strIncludesCaseInsensitive } from '../../utils/string'
import { useEffect, useMemo, useState } from 'react'
import { Props as TableProps } from './Table'
import './TableFilter.css'


type Filter<T> = Record<FilterableTableCol<T>['filterField'], any>

type Props<T> = Pick<TableProps<T>, 'cols' | 'rows'> & {
  onChange: (filteredRows: T[]) => any
}

const TableFilter = <T, >({ cols, rows, onChange }: Props<T>) => {
  const [filter, setFilter] = useState({} as Filter<T>)

  const colsWithFilter = useMemo(() => (
    cols.filter(tableColWithFilterPredicate)
  ), [cols, tableColWithFilterPredicate])

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
              return (rowVal as Date).toISOString().indexOf(filterVal) === 0
          }
        }),
      ),
    )
  }, [rows, filter, colsWithFilter, strIncludesCaseInsensitive])

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

export default TableFilter
