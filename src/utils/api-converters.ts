import { formatDuration, isoDurationToSeconds } from '@/utils/date'


const getGameDates = (apiGame: { endedAt: string, duration: DurationIso8601 }): GameDates => {
  const endedAt = new Date(apiGame.endedAt)

  const durationInSeconds = isoDurationToSeconds(apiGame.duration)

  return {
    startedAt: new Date(+endedAt - durationInSeconds * 1000),
    endedAt,
    duration: formatDuration(durationInSeconds),
  }
}

export const convertGamesInfo = (apiAllMissions: ApiAllMissions, gamesCount: number): Game[] => {
  const res = [] as Game[]

  for (const apiGame of apiAllMissions.missions)
    res.push({
      ...apiGame,
      missionName: apiGame.missionName.trim(),
      ...getGameDates(apiGame),
      id: gamesCount - apiGame.index,
    })

  return res
}

export const convertGameStatsInfo = (apiMission: ApiMission): GameStats => ({
  ...apiMission.missionInfo,
  ...getGameDates(apiMission.missionInfo),
})

export const convertGameScores = (apiOcapStats: ApiOcapStats): GameScore[] => {
  const fragsMap = apiOcapStats.scores.reduce((acc, score) => {
    for (const frag of score.frags) {
      acc[score.player] ??= {}
      acc[score.player]![frag.victim] ??= []
      acc[score.player]![frag.victim]!.push(frag)
    }

    return acc
  }, {} as Record<GameScore['player'], Record<GameScore['player'], GameScoreKill[]>>)

  const res = [] as GameScore[]
  for (const score of apiOcapStats.scores) {
    const convertKiller = (killer: GameScore['player']): GameScoreKill => {
      const frag = fragsMap[killer]?.[score.player]?.shift()
      if (!frag)
        throw new Error('Frag not found')

      return {
        ...frag,
        victim: killer,
      }
    }

    const frags = score.frags.filter(f => !f.isTeamKill)
    const teamKills = score.frags.filter(f => f.isTeamKill)
    const killers = score.killers.map(convertKiller)
    const teamKillers = score.teamKillers.map(convertKiller)

    res.push({
      player: score.player,
      frags,
      teamKills,
      killers,
      teamKillers,
      fragsCount: frags.length,
      teamKillsCount: teamKills.length,
      killersCount: killers.length,
      teamKillersCount: teamKillers.length,
    })
  }

  return res
}

export const convertGameSquadScores = (
  { squadsOnline, playersDied }: ApiSquadsOnline,
  { squadCutlets }: ApiSquadCutlets,
  { squadUncutlets }: ApiSquadUncutlets,
): GameSquadScore[] => {
  const res = [] as GameSquadScore[]

  for (const [name, online] of Object.entries(squadsOnline))
    res.push({
      name,
      online,
      died: playersDied[name]!,
      frags: squadCutlets[name]!,
      teamKills: squadUncutlets[name]!,
    })

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
