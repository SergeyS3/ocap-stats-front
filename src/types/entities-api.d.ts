type ApiAllMissions = {
  missions: {
    index: number
    missionName: string
    endedAt: string
    world: string
    author: string
    duration: `PT${string}`
    players: number
    kills: number
    teamKills: number
    missionFile: string
  }[]
}

type ApiMission = {
  missionInfo: {
    index: number
    missionName: string
    endedAt: string
    world: string
    author: string
    duration: DurationIso8601
    players: number
    kills: number
    teamKills: number
    missionFile: string
  }
}

type ApiOcapStats = {
  missionName: string
  dateTime: string
  scores: {
    player: string
    frags: {
      victim: string
      timeMark: string
      isTeamKill: boolean
      isBot: boolean
      weapon: string
      distance: number
    }[]
    killers: string[]
    teamKillers: string[]
  }[]
}

type ApiCount = {
  gameMode: string
  count: number
}

type ApiFullStat = {
  stats: {
    player: string
    games: number
    frags: number
    teamKills: number
    deaths: number
  }[]
}

type ApiOcapHistory = {
  player: string
  scores: {
    index: number
    missionName: string
    dateTime: string
    score: {
      present: boolean
      frags: {
        victim: string
        timeMark: `${number}:${number}:${number}`
        isTeamKill: boolean
        isBot: boolean
        weapon: string
        distance: number
      }[],
      killers: string[]
      teamKillers: string[]
    }
  }[]
}

type ApiSquads = {
  squads: {
    shortName: string
    fullName: string
    discordModerators: number[]
    possibleTags: string[]
    players: string
  }[]
}

type ApiSquadStat<T extends string> = {
  dateTime: string
  missionName: string
} & {
  [K in T]: Record<ApiSquads['squads'][0]['shortName'], number>
}
type ApiSquadsOnline = ApiSquadStat<'squadsOnline' | 'playersDied'>
type ApiSquadCutlets = ApiSquadStat<'squadCutlets'>
type ApiSquadUncutlets = ApiSquadStat<'squadUncutlets'>
