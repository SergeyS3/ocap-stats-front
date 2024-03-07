import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'


type Props = {
  playerStats: PlayerStats
}

const PlayerSummaryGamesPie = ({ playerStats }: Props) => {
  const gamesData: EChartsPieData = useMemo(() => {
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

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryGamesPie
