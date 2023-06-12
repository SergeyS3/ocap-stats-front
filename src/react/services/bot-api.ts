import { convertGamesInfo } from '../utils/apiConverters'


export enum Project {
  tvt1 = 'rb-tvt1',
  tvt2 = 'rb-tvt2',
}

export class BotApi {
  static async allGames(project: Project) {
    const res = await this.fetch(`/${project}/allMissions`)

    return convertGamesInfo(await res.json())
  }

  static async players(project: Project) {
    const res = await this.fetch(`/${project}/fullStat`, { untaged: false })

    return (await res.json() as ApiFullStat).stats
  }

  private static async fetch(path: string, params?: Record<string, any>): Promise<Response> {
    if (params)
      path += '?' + new URLSearchParams(params)

    return fetch(process.env.BOT_API_URL + path, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
}
