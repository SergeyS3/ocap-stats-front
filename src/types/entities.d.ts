type Game = Omit<ApiAllMissions['missions'][0], 'endedAt' | 'duration'> & {
  startedAt: Date
  endedAt: Date
  duration: string
}

type Player = ApiFullStat['stats'][0]
