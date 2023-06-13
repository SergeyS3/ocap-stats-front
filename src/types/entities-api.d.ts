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
