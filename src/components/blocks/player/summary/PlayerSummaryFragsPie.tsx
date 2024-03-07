import { useMemo } from 'react'
import EChartsPie from '@/components/echarts/EChartsPie'


type Props = {
  playerStats: PlayerStats
}

const PlayerSummaryFragsPie = ({ playerStats }: Props) => {
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
