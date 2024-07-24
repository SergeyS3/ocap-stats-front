import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'
import usePlayerQuery from '@/hooks/queries/usePlayerQuery'
import Loader from '@/components/Loader'


const PlayerSummaryGamesPie = () => {
  const { isFetching, error, data: playerStats } = usePlayerQuery()

  const gamesData: EChartsPieData = useMemo(() => {
    if (!playerStats)
      return []

    const firstStat = playerStats.statHistory.find(s => s.isPlayed)!

    return [
      {
        name: 'Выжил',
        value: playerStats.games - playerStats.deaths,
        color: '#73c0de',
      },
      {
        name: 'Убит игроком',
        value: playerStats.deaths,
        color: '#5470c6',
      },
      {
        name: 'Не присутствовал',
        value: firstStat.index + 1 - playerStats.games,
        color: '#fac858',
      },
    ] satisfies EChartsPieData
  }, [playerStats])

  if (isFetching || error || !playerStats)
    return <Loader />

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryGamesPie
