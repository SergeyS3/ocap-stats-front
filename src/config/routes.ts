const routes = {
  games: '/games',
  players: '/players',
} as const satisfies Record<string, string>

export default routes
