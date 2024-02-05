import { useMemo } from 'react'
import EChartsChart from '@/components/echarts/EChartsChart'
import Block from '@/layouts/Block'


type Props = {
  playerStats: PlayerStat[]
}

const PlayerStatsChart = ({ playerStats }: Props) => {
  const chartItems: EChartsChartItem[] = useMemo(() => {
    const frags = [] as EChartsChartLineData
    const teamKills = [] as EChartsChartLineData
    const games = [] as EChartsChartAreaData

    let gamesStreak: Date[] = []

    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const i in playerStats) {
      const prevStat = i ? playerStats[+i - 1]! : null
      const stat = playerStats[i]!

      const getDiff = (key: keyof PickByType<PlayerStat, number>) => prevStat ? stat[key] - prevStat[key] : stat[key]

      const isPlayed = !!getDiff('games')
      const isLast = +i === playerStats.length - 1

      frags.push({
        date: stat.dateTime,
        value: getDiff('frags'),
      })
      teamKills.push({
        date: stat.dateTime,
        value: -getDiff('teamKills'),
      })

      if (isPlayed && !isLast)
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
