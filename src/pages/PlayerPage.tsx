import useTitle from '@/hooks/useTitle'
import { useParams } from 'react-router-dom'
import useProject from '@/hooks/useProject'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerHistory } from '@/services/bot-api'
import Block from '@/layouts/Block'
import Loader from '@/components/Loader'
import PlayerStatsChart from '@/components/blocks/player/PlayerStatsChart'
import CountableStatTable, { CountableStatTableData } from '@/components/blocks/CountableStatTable'
import { useMemo } from 'react'
import routes from '@/config/routes'
import PlayerSummary from '@/components/blocks/player/summary/PlayerSummary'


const PlayerPage = () => {
  const { project } = useProject()
  const { player } = useParams()
  const { isFetching, error, data: playerStats } = useQuery({
    queryKey: ['player', project, player],
    queryFn: () => fetchPlayerHistory(project.code, player!),
  })

  useTitle(`${project.name}: Игрок ${player}`)

  const { frags, teamKills, weaponKills, weaponDistance, killedBy, teamKilledBy } = useMemo(() => {
    const frags = new Map as CountableStatTableData
    const teamKills = new Map as CountableStatTableData
    const weaponKills = new Map as CountableStatTableData
    const weaponDistances = new Map as CountableStatTableData
    const killedBy = new Map as CountableStatTableData
    const teamKilledBy = new Map as CountableStatTableData

    const incrementValue = (
      map: CountableStatTableData,
      name: string,
      getRoute?: (project: string, id: string) => string,
    ) => {
      let data = map.get(name)
      if (data)
        data.value++
      else
        data = {
          route: getRoute?.(project.code, name),
          value: 1,
        }

      map.set(name, data)
    }

    if (playerStats)
      for (const stat of playerStats.statHistory) {
        for (const frag of stat.score.frags) {
          incrementValue(frag.isTeamKill ? teamKills : frags, frag.victim, routes.player)
          incrementValue(weaponKills, frag.weapon)

          const weaponDistance = weaponDistances.get(frag.weapon) ?? { value: 0 }
          if (weaponDistance.value < frag.distance)
            weaponDistance.value = frag.distance

          weaponDistances.set(frag.weapon, weaponDistance)
        }

        for (const killer of stat.score.killers)
          incrementValue(killedBy, killer, routes.player)
        for (const teamKiller of stat.score.teamKillers)
          incrementValue(teamKilledBy, teamKiller, routes.player)
      }

    return { frags, teamKills, weaponKills, weaponDistance: weaponDistances, killedBy, teamKilledBy }
  }, [playerStats, project])

  if (isFetching || error)
    return <Block fullWidth><Loader /></Block>

  if (!playerStats || playerStats.statHistory.every(s => !s.isPlayed))
    return <Block>Игрок {player} не принимал участие в играх на проекте {project.name}</Block>

  return (
    <>
      <PlayerSummary playerStats={playerStats} />
      <div className='flex-wrap'>
        <CountableStatTable label='Фраги' data={frags} />
        <CountableStatTable label='Тимкиллы' data={teamKills} />
        <CountableStatTable label='Оружие по убийствам' data={weaponKills} />
        <CountableStatTable label='Оружие по дальности' data={weaponDistance} />
        <CountableStatTable label='Убит врагом' data={killedBy} />
        <CountableStatTable label='Убит тимкиллом' data={teamKilledBy} />
      </div>
      <PlayerStatsChart playerStats={playerStats} />
    </>
  )
}

export default PlayerPage
