type GameDates = {
  startedAt: Date
  endedAt: Date
  duration: string
}

type Game = Omit<ApiAllMissions['missions'][0], 'endedAt' | 'duration'> & GameDates & {
  id: number
}

type GameStats = Omit<ApiMission['missionInfo'], 'endedAt' | 'duration'> & GameDates

type GameScoreKill = ApiOcapStats['scores'][0]['frags'][0]
type GameScore = Pick<ApiOcapStats['scores'][0], 'player' | 'frags'> & {
  teamKills: GameScoreKill[]
  killers: GameScoreKill[]
  teamKillers: GameScoreKill[]
  fragsCount: number
  teamKillsCount: number
  killersCount: number
  teamKillersCount: number
}

type GameSquadScore = {
  name: string
  online: number
  died: number
  frags: number
  teamKills: number
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
