import { CSSProperties, useLayoutEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { EChartOption, ECharts as EChartsChart } from 'echarts'
import 'echarts/i18n/langRU'


export type Props = {
  options: EChartOption
  height: CSSProperties['height']
  width: CSSProperties['width']
  onInit?: (chart: EChartsChart) => any
}

const ECharts = ({ options, height, width, onInit }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const chart = echarts.init(ref.current, null, { locale: 'RU' })

    chart.setOption(options)

    window.addEventListener('resize', () => chart.resize())

    onInit?.(chart)
  }, [options, onInit])

  return <div ref={ref} style={{ height, width }} />
}

export default ECharts
