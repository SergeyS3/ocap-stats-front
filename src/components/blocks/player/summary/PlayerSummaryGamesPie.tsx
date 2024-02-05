import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'


type Props = {
  playerStats: PlayerStat[]
}

const PlayerSummaryGamesPie = ({ playerStats }: Props) => {
  const gamesData: EChartsPieData = useMemo(() => {
    if (!playerStats.length)
      return []

    const firstStat = playerStats.find(s => s.games === 1)!
    const lastStat = playerStats.at(-1)!

    const gamesDelta = playerStats.length - (firstStat.index + 1)

    return [
      {
        name: 'Выжил',
        value: lastStat.games - lastStat.deaths,
        color: '#73c0de',
      },
      {
        name: 'Убит игроком',
        value: lastStat.deaths,
        color: '#5470c6',
      },
      {
        name: 'Не присутствовал',
        value: playerStats.length - lastStat.games - gamesDelta,
        color: '#fac858',
      },
    ] satisfies EChartsPieData
  }, [playerStats])

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryGamesPie
