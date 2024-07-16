import useTitle from '@/hooks/useTitle'
import Block from '@/layouts/Block'
import GameStats from '@/components/blocks/game/GameStats'
import { useQuery } from '@tanstack/react-query'
import { fetchGameIndex, fetchGameStats } from '@/services/bot-api'
import useProject from '@/hooks/useProject'
import { useParams } from 'react-router-dom'
import Loader from '@/components/Loader'
import GameScores from '@/components/blocks/game/GameScores'
import GameSquadScores from '@/components/blocks/game/GameSquadScores'


const PlayerPage = () => {
  const { project } = useProject()
  const { id } = useParams()
  const { isFetching: isFetchingIndex, error: indexError, data: index } = useQuery({
    queryKey: ['game_index', project, id],
    queryFn: () => fetchGameIndex(project.code, +id!),
  })
  const { isFetching: isFetchingGameStats, error: gameStatsError, data: gameStats } = useQuery({
    queryKey: ['game_stats', project, index],
    queryFn: () => fetchGameStats(project.code, index!),
    enabled: Number.isInteger(index),
  })

  useTitle(`${project.name}: Игра ${id}`)

  if (isFetchingIndex || indexError || isFetchingGameStats || gameStatsError || !gameStats)
    return <Block fullWidth><Loader /></Block>

  return (
    <div className='flex-wrap'>
      <Block>
        <GameStats gameStats={gameStats} />
      </Block>
      <Block>
        <GameScores index={index!} missionFile={gameStats.missionFile} />
      </Block>
      <Block>
        <GameSquadScores index={index!} />
      </Block>
    </div>
  )
}

export default PlayerPage
