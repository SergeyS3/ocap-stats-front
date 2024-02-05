import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'


type Props = {
  playerStats: PlayerStat[]
}

const PlayerSummaryFragsPie = ({ playerStats }: Props) => {
  const gamesData: EChartsPieData = useMemo(() => {
    if (!playerStats.length)
      return []

    const lastStat = playerStats.at(-1)!

    return [
      {
        name: 'Фраги',
        value: lastStat.frags,
        color: '#91cc75',
      },
      {
        name: 'Тимкиллы',
        value: lastStat.teamKills,
        color: '#ee6666',
      },
    ] satisfies EChartsPieData
  }, [playerStats])

  return <EChartsPie data={gamesData} />
}

export default PlayerSummaryFragsPie
