import { useCallback, useMemo } from 'react'
import { EChartOption } from 'echarts'
import { formatDate, formatTime } from '@/utils/date'
import ECharts, { Props as EChartsProps } from '@/components/echarts/ECharts'


type Props = {
  items: EChartsChartItem[]
  stack?: boolean
  noNegative?: boolean
}

const EChartsChart = ({ items, stack, noNegative }: Props) => {
  const options: EChartsProps['options'] = useMemo(() => {
    const colors: string[] = []
    const series: EChartOption.Series[] = []

    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY

    for (const { color, name, type, data } of items) {
      colors.push(color)

      const seriesData: EChartOption.Series = {
        name,
        type: type === 'area' ? 'bar' : type,
        stack: stack ? 's' : undefined,
      }

      if (type === 'area')
        seriesData.markArea = {
          itemStyle: {
            color,
          },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: data.map(({ dateFrom, dateTo }) => [{ xAxis: dateFrom }, { xAxis: dateTo }]) as any,
        }
      else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        seriesData.data = data.map(({ date, value }) => [date, value]) as any

        for (const { value } of data) {
          if (value < min)
            min = value
          if (value > max)
            max = value
        }
      }

      if (noNegative)
        seriesData.tooltip = {
          valueFormatter: v => Math.abs(+v),
        }

      series.push(seriesData)
    }

    return {
      xAxis: [
        {
          type: 'time',
          boundaryGap: false,
        },
      ],
      yAxis: [
        {
          min: min - 1,
          max: max + 1,
          type: 'value',
          axisLabel: {
            formatter: noNegative ? v => Math.abs(+v) : undefined,
          },
        },
      ],
      dataZoom: [{ type: 'inside' }],
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            icon: {
              zoom: 'path://', // hack to remove zoom button
            },
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          label: {
            formatter: ({ value }) => `${formatDate(value)} ${formatTime(value)}`,
          },
        },
      },
      legend: { show: true },
      grid: { left: 25, right: 10, bottom: 20 },
      color: colors,
      series,
    } satisfies EChartsProps['options']

  }, [items, stack, noNegative])


  const handleInit: NonNullable<EChartsProps['onInit']> = useCallback(chart => {
    chart.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    })
  }, [])

  return <ECharts options={options} onInit={handleInit} height={300} width='100%' />
}

export default EChartsChart
