import Block from '@/layouts/Block'
import { useMemo, useState } from 'react'
import Pagination from '@/components/Pagination'
import VerticalTable, { VerticalTableRow } from '@/layouts/tables/vertical/VerticalTable'


export type CountableStatTableData = Map<string, {
  route?: string
  value: number
}>

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
      }) satisfies VerticalTableRow)
  }, [data])

  const [pageRows, setPageRows] = useState([] as VerticalTableRow[])

  return (
    <Block>
      <VerticalTable label={label} rows={pageRows} className='w100' />
      <Pagination items={rows} pageSize={10} onPageSet={setPageRows} />
    </Block>
  )
}

export default CountableStatTable
