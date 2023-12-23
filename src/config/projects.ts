export const projects = [
  { code: 'rb-tvt1', name: 'TvT 1' },
  { code: 'rb-tvt2', name: 'TvT 2' },
] as const satisfies readonly { code: string, name: string }[]

export type Project = (typeof projects)[number]
