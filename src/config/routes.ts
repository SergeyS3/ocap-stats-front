import { prepareRouteParam } from '@/utils'


const routes = {
  games: (project: string) => `/${project}/games`,
  players: (project: string) => `/${project}/players`,
  player: (project: string, id: string) => `/${project}/players/${prepareRouteParam(id)}`,
} as const satisfies Record<string, string | ((...args: any) => string)>

export default routes
