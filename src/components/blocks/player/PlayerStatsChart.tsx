import { useMemo } from 'react'
import EChartsChart from '@/components/echarts/EChartsChart'
import Block from '@/layouts/Block'


type Props = {
  playerStats: PlayerStats
}

const PlayerStatsChart = ({ playerStats }: Props) => {
  const chartItems: EChartsChartItem[] = useMemo(() => {
    const frags = [] as EChartsChartLineData
    const teamKills = [] as EChartsChartLineData
    const games = [] as EChartsChartAreaData

    let gamesStreak: Date[] = []

    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const stat of playerStats.statHistory) {
      frags.push({
        date: stat.dateTime,
        value: stat.frags,
      })
      teamKills.push({
        date: stat.dateTime,
        value: -stat.teamKills,
      })

      if (stat.isPlayed && stat !== playerStats.statHistory.at(-1))
        gamesStreak.push(stat.dateTime)
      else if (gamesStreak.length) {
        const additionalWidth = 1000 * 60 * 15
        games.push({
          dateFrom: +new Date(gamesStreak[0]!) - additionalWidth,
          dateTo: +new Date(gamesStreak.at(-1)!) + additionalWidth,
        })
        gamesStreak = []
      }
    }

    return [
      {
        name: 'Фраги',
        type: 'bar',
        color: '#91cc75',
        data: frags,
      },
      {
        name: 'Тимкиллы',
        type: 'bar',
        color: '#ee6666',
        data: teamKills,
      },
      {
        name: 'Был на миссии',
        type: 'area',
        color: 'rgba(0, 255, 0, .075)',
        data: games,
      },
    ] satisfies EChartsChartItem[]
  }, [playerStats])

  return (
    <Block fullWidth>
      <EChartsChart items={chartItems} stack noNegative />
    </Block>
  )
}

export default PlayerStatsChart
