import {
  convertGameScores, convertGamesInfo, convertGameSquadScores, convertGameStatsInfo, convertPlayersInfo,
  convertPlayerStatsInfo,
} from '@/utils/api-converters'
import ApiFetchError from '@/errors/ApiFetchError'
import { ProjectCode } from '@/hooks/useProject'
import { makeUrl, MakeUrlParams } from '@/utils/string'


export const fetchGamesCount = async (project: ProjectCode): Promise<number> => {
  const res = await fetchApi<ApiCount>(`/${project}/count`)

  return res.count
}

export const fetchGameIndex = async (project: ProjectCode, id: Game['id']): Promise<number> => {
  const gamesCount = await fetchGamesCount(project)

  return gamesCount - id
}

export const fetchGames = async (project: ProjectCode): Promise<Game[]> => {
  const [res, gamesCount] = await Promise.all([
    fetchApi<ApiAllMissions>(`/${project}/allMissions`),
    fetchGamesCount(project),
  ])

  return convertGamesInfo(res, gamesCount)
}

export const fetchGameStats = async (project: ProjectCode, index: number): Promise<GameStats> => {
  const res = await fetchApi<ApiMission>(`/${project}/mission`, { index })

  return convertGameStatsInfo(res)
}

export const fetchGameScores = async (project: ProjectCode, index: number): Promise<GameScore[]> => {
  const res = await fetchApi<ApiOcapStats>(`/${project}/fullOcap`, { index })

  return convertGameScores(res)
}

export const fetchGameSquadScores = async (project: ProjectCode, index: number): Promise<GameSquadScore[]> => {
  const res = await Promise.all([
    fetchApi<ApiSquadsOnline>(`/${project}/squadsOnline`, { index }),
    fetchApi<ApiSquadCutlets>(`/${project}/squadCutlets`, { index }),
    fetchApi<ApiSquadUncutlets>(`/${project}/squadUncutlets`, { index }),
  ])

  return convertGameSquadScores(...res)
}

export const fetchPlayers = async (project: ProjectCode): Promise<Player[]> => {
  const res = await fetchApi<ApiFullStat>(`/${project}/fullStat`, { untaged: false })

  return convertPlayersInfo(res)
}

export const fetchPlayerHistory = async (project: ProjectCode, player: string): Promise<PlayerStats> => {
  const res = await fetchApi<ApiOcapHistory>(`/${project}/ocapHistory`, { player })

  return convertPlayerStatsInfo(res)
}

const fetchApi = async <T>(path: string, params?: MakeUrlParams): Promise<T> => {
  if (!process.env.BOT_API_URL)
    throw new Error('Env BOT_API_URL is not set')

  const res = await fetch(makeUrl(process.env.BOT_API_URL + path, params), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  let error = ''
  switch (res.status) {
    case 200:
      break
    case 429:
      error = 'Слишком много запросов'
      break
    default:
      error = 'Ошибка запроса'
  }
  if (error)
    throw new ApiFetchError(error)

  return await res.json() as T
}
