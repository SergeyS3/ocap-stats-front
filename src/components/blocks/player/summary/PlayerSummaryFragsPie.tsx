import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'
import usePlayerQuery from '@/hooks/queries/usePlayerQuery'
import Loader from '@/components/Loader'


const PlayerSummaryFragsPie = () => {
  const { isFetching, error, data: playerStats } = usePlayerQuery()

  if (isFetching || error || !playerStats)
    return <Loader />

  const gamesData: EChartsPieData = useMemo(() => [
    {
      name: 'Фраги',
      value: playerStats.frags,
      color: '#91cc75',
    },
    {
      name: 'Тимкиллы',
      value: playerStats.teamKills,
      color: '#ee6666',
    },
  ] satisfies EChartsPieData, [playerStats])

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryFragsPie
