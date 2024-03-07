import Block from '@/layouts/Block'
import { useMemo, useState } from 'react'
import Pagination from '@/components/Pagination'
import { NavLink } from 'react-router-dom'


type Row = {
  label: string
  route?: string
  value: number
}

export type CountableStatTableData = Map<Row['label'], Omit<Row, 'label'>>

type Props = {
  label: string
  data: CountableStatTableData
}

const CountableStatTable = ({ label, data }: Props) => {
  const rows = useMemo(() => {
    return [...data.entries()]
      .sort((a, b) => b[1].value - a[1].value)
      .map(entry => ({
        label: entry[0],
        ...entry[1],
      }) satisfies Row)
  }, [data])

  const [pageRows, setPageRows] = useState([] as Row[])

  return (
    <Block>
      <table className='w100'>
        <tbody>
          <tr>
            <th colSpan={2}>{label}</th>
          </tr>
          {pageRows.map(({ label, route, value }) =>
            <tr key={label}>
              <td>
                {route
                  ? <NavLink to={route}>{label}</NavLink>
                  : label
                }
              </td>
              <td>{value}</td>
            </tr>,
          )}
        </tbody>
      </table>
      <Pagination items={rows} pageSize={10} onPageSet={setPageRows} />
    </Block>
  )
}

export default CountableStatTable
