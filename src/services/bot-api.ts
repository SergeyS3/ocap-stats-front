import { convertGamesInfo } from '../utils/api-converters'


export enum Project {
  tvt1 = 'rb-tvt1',
  tvt2 = 'rb-tvt2',
}

export const fetchGames = async (project: Project): Promise<Game[]> => {
  const res = await fetchApi<ApiAllMissions>(`/${project}/allMissions`)

  return convertGamesInfo(res)
}

export const fetchPlayers = async (project: Project): Promise<Player[]> => {
  const res = await fetchApi<ApiFullStat>(`/${project}/fullStat`, { untaged: false })

  return res.stats
}

const fetchApi = async <T>(path: string, params?: Record<string, any>): Promise<T> => {
  if (params)
    path += '?' + new URLSearchParams(params).toString()

  const res = await fetch(process.env.BOT_API_URL + path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return await res.json() as T
}