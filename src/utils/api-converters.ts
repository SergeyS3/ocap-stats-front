import { parse } from 'tinyduration'
import { formatDuration } from './date'


export const convertGamesInfo = (gamesInfoRes: ApiAllMissions): Game[] => {
  const res = [] as Game[]

  for (const gameInfoRes of gamesInfoRes.missions) {
    const endedAt = new Date(gameInfoRes.endedAt)

    const duration = parse(gameInfoRes.duration)
    const durationInSeconds = (duration.hours ?? 0) * 3600 + (duration.minutes ?? 0) * 60 + (duration.seconds ?? 0)

    res.push({
      ...gameInfoRes,
      missionName: gameInfoRes.missionName.trim(),
      duration: formatDuration(durationInSeconds),
      startedAt: new Date(+endedAt - durationInSeconds * 1000),
      endedAt,
    })
  }

  return res
}
