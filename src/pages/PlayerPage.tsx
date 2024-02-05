import useTitle from '@/hooks/useTitle'
import { useParams } from 'react-router-dom'
import useProject from '@/hooks/useProject'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerStats } from '@/services/bot-api'
import Block from '@/layouts/Block'
import Loader from '@/components/Loader'
import PlayerStatsChart from '@/components/blocks/player/PlayerStatsChart'
import PlayerSummary from '@/components/blocks/player/summary/PlayerSummary'


const PlayerPage = () => {
  const { project } = useProject()
  const { player } = useParams()
  const { isFetching, error, data: playerStats } = useQuery({
    queryKey: ['player', project, player],
    queryFn: () => fetchPlayerStats(project.code, player!),
    initialData: [],
  })

  useTitle(`${project.name}: Игрок ${player}`)

  if (isFetching || error)
    return <Block fullWidth><Loader /></Block>

  if ((playerStats.at(-1)?.games ?? 0) === 0)
    return <Block>Игрок {player} не принимал участие в играх на проекте {project.name}</Block>

  return (
    <>
      <PlayerSummary playerStats={playerStats} />
      <PlayerStatsChart playerStats={playerStats} />
    </>
  )
}

export default PlayerPage
