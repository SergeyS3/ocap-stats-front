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

export const convertPlayerStatsInfo = (apiStatHistory: ApiOcapHistory): PlayerStats => {
  const res: PlayerStats = {
    games: 0,
    deaths: 0,
    frags: 0,
    teamKills: 0,
    statHistory: [],
  }

  for (const apiStat of apiStatHistory.scores.toReversed()) {
    const isPlayed = apiStat.score.present
    const isDead = !!apiStat.score.killers.length || !!apiStat.score.teamKillers.length
    const frags = apiStat.score.frags.filter(f => !f.isTeamKill).length
    const teamKills = apiStat.score.frags.filter(f => f.isTeamKill).length

    isPlayed && res.games++
    isDead && res.deaths++
    res.frags += frags
    res.teamKills += teamKills

    res.statHistory.push({
      ...apiStat,
      dateTime: new Date(apiStat.dateTime),
      isPlayed,
      isDead,
      frags,
      teamKills,
    })
  }

  return res
}
