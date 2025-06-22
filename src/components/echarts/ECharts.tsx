import { CSSProperties, useLayoutEffect, useRef } from 'react'
import * as echartsCore from 'echarts/core'
import { EChartsOption, EChartsType, init } from 'echarts/types/dist/shared'
import 'echarts/i18n/langRU'


const echarts = echartsCore as { init: typeof init } // fixing echarts core typings error

export type Props = {
  options: EChartsOption
  height: CSSProperties['height']
  width: CSSProperties['width']
  onInit?: (chart: EChartsType) => unknown
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
