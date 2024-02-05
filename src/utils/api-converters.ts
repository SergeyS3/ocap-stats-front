import { parse } from 'tinyduration'
import { formatDuration } from '@/utils/date'


export const convertGamesInfo = (apiAllMissions: ApiAllMissions): Game[] => {
  const res = [] as Game[]

  for (const apiGame of apiAllMissions.missions) {
    const endedAt = new Date(apiGame.endedAt)

    const duration = parse(apiGame.duration)
    const durationInSeconds = (duration.hours ?? 0) * 3600 + (duration.minutes ?? 0) * 60 + (duration.seconds ?? 0)

    res.push({
      ...apiGame,
      missionName: apiGame.missionName.trim(),
      duration: formatDuration(durationInSeconds),
      startedAt: new Date(+endedAt - durationInSeconds * 1000),
      endedAt,
    })
  }

  return res
}

export const convertPlayersInfo = (apiFullStat: ApiFullStat): Player[] => apiFullStat.stats

export const convertPlayerStatsInfo = (apiStatHistory: ApiStatHistory): PlayerStat[] => {
  const res = [] as PlayerStat[]

  for (const apiStat of apiStatHistory.result.toReversed())
    res.push({
      ...apiStat,
      dateTime: new Date(apiStat.dateTime),
    })

  return res
}
