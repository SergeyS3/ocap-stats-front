type Game = Omit<ApiAllMissions['missions'][0], 'endedAt' | 'duration'> & {
  startedAt: Date
  endedAt: Date
  duration: string
}

type Player = ApiFullStat['stats'][0]

type PlayerStat = Omit<ApiStatHistory['result'][0], 'dateTime'> & {
  dateTime: Date
}
