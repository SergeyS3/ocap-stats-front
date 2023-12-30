const routes = {
  games: (project: string) => `/${project}/games`,
  players: (project: string) => `/${project}/players`,
} as const satisfies Record<string, string | ((...args: any) => string)>

export default routes
