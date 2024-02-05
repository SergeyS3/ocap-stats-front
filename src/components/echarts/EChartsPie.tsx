import { useMemo } from 'react'
import ECharts, { Props as EChartsProps } from '@/components/echarts/ECharts'


type Props = {
  data: EChartsPieData
}

const EChartsPie = ({ data }: Props) => {
  const options: EChartsProps['options'] = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {},
      series: [
        {
          type: 'pie',
          data,
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%',
          },
          bottom: -35,
        },
      ],
      color: data.map(({ color }) => color),
    } satisfies EChartsProps['options']
  }, [data])

  return <ECharts options={options} height={250} width={365} />
}

export default EChartsPie
