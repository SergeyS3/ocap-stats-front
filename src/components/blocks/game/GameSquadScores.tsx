import useProject from '@/hooks/useProject'
import { fetchGameSquadScores } from '@/services/bot-api'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import HorizontalTable from '@/layouts/tables/horizontal/HorizontalTable'
import { AnyTableCols } from '@/types/table'


type Props = {
  index: number
}

const GameSquadScores = ({ index }: Props) => {
  const { project } = useProject()
  const { isFetching, error, data: gameScores } = useQuery({
    queryKey: ['game_squad_scores', project.code, index],
    queryFn: () => fetchGameSquadScores(project.code, index),
  })

  if (isFetching || error)
    return <Loader />

  const gameStatsTableCols: AnyTableCols<GameSquadScore> = [
    {
      label: 'Отряд',
      getVal: gameSquadScore => gameSquadScore.name,
      filterType: 'text',
      filterField: 'name',
    },
    {
      label: 'Онлайн',
      getVal: gameSquadScore => gameSquadScore.online,
      sortField: 'online',
      filterField: false,
    },
    {
      label: 'Фраги',
      getVal: gameSquadScore => gameSquadScore.frags,
      sortField: 'frags',
      filterField: false,
    },
    {
      label: 'Тимкиллы',
      getVal: gameSquadScore => gameSquadScore.teamKills,
      sortField: 'teamKills',
      filterField: false,
    },
    {
      label: 'Убито',
      getVal: gameSquadScore => gameSquadScore.died,
      sortField: 'died',
      filterField: false,
    },
  ]

  return (
    <HorizontalTable
      cols={gameStatsTableCols}
      rows={gameScores ?? []}
      isFetching={isFetching || !!error}
      defaultSortField='frags'
    />
  )
}

export default GameSquadScores
