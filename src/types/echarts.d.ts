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
