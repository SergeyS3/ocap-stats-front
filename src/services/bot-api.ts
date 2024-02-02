import { convertGamesInfo } from '@/utils/api-converters'
import ApiFetchError from '@/errors/ApiFetchError'
import { ProjectCode } from '@/hooks/useProject'


export const fetchGames = async (project: ProjectCode): Promise<Game[]> => {
  const res = await fetchApi<ApiAllMissions>(`/${project}/allMissions`)

  return convertGamesInfo(res)
}

export const fetchPlayers = async (project: ProjectCode): Promise<Player[]> => {
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
