import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'
import usePlayerQuery from '@/hooks/queries/usePlayerQuery'
import Loader from '@/components/Loader'


const PlayerSummaryFragsPie = () => {
  const { isFetching, error, data: playerStats } = usePlayerQuery()

  const gamesData: EChartsPieData = useMemo(() => {
    if (!playerStats)
      return []

    return [
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
    ] satisfies EChartsPieData
  }, [playerStats])

  if (isFetching || error || !playerStats)
    return <Loader />

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryFragsPie
