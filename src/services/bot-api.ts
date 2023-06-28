import { convertGamesInfo } from '../utils/apiConverters'


export enum Project {
  tvt1 = 'rb-tvt1',
  tvt2 = 'rb-tvt2',
}

export const fetchGames = async (project: Project) => {
  const res = await fetchApi(`/${project}/allMissions`)

  return convertGamesInfo(await res.json())
}

export const fetchPlayers = async (project: Project) => {
  const res = await fetchApi(`/${project}/fullStat`, { untaged: false })

  return (await res.json() as ApiFullStat).stats
}

const fetchApi = async (path: string, params?: Record<string, any>): Promise<Response> => {
  if (params)
    path += '?' + new URLSearchParams(params)

  return await fetch(process.env.BOT_API_URL + path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
