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
