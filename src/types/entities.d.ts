type Game = Omit<ApiAllMissions['missions'][0], 'endedAt' | 'duration'> & {
  startedAt: Date
  endedAt: Date
  duration: string
}

type Player = ApiFullStat['stats'][0]

type PlayerStats = {
  games: number
  deaths: number
  frags: number
  teamKills: number
  statHistory: (Omit<ApiOcapHistory['scores'][0], 'dateTime'> & {
    isPlayed: boolean
    isDead: boolean
    frags: number
    teamKills: number
    dateTime: Date
  })[]
}
