declare namespace echarts {
  namespace EChartOption {
    type _formatter = (value: string | number) => string | number

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface BaseTooltip {
      valueFormatter?: _formatter
    }

    namespace BasicComponents {
      namespace CartesianAxis {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface Label {
          formatter?: _formatter | {
            year?: string
            month?: string
            day?: string
            hour?: string
            minute?: string
            second?: string
            millisecond?: string
            none?: string
          }
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface PointerLabel {
          formatter?: ({ value }: { value: number }) => string
        }
      }
    }
  }
}


type EChartsChartLineData = {
  date: DateConstructorParam,
  value: number
}[]

type EChartsChartAreaData = {
  dateFrom: DateConstructorParam,
  dateTo: DateConstructorParam
}[]

type EChartsPieData = {
  name: string,
  value: number,
  color: string
}[]


type EChartsChartItem = {
  name: string,
  color: string,
} & ({
  type: 'line' | 'bar'
  data: EChartsChartLineData
} | {
  type: 'area'
  data: EChartsChartAreaData
})
