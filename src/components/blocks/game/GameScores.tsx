import useProject from '@/hooks/useProject'
import { fetchGameScores } from '@/services/bot-api'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import HorizontalTable from '@/layouts/tables/horizontal/HorizontalTable'
import GameScoreKills from '@/components/blocks/game/GameScoreKills'
import { AnyTableCols } from '@/types/table'
import PlayerLink from '@/components/links/PlayerLink'


type Props = {
  index: number
  missionFile: Game['missionFile']
}

const GameScores = ({ index, missionFile }: Props) => {
  const { project } = useProject()
  const { isFetching, error, data: gameScores } = useQuery({
    queryKey: ['game_scores', project.code, index],
    queryFn: () => fetchGameScores(project.code, index),
    initialData: [],
  })

  if (isFetching || error)
    return <Loader />

  const gameStatsTableCols: AnyTableCols<GameScore> = [
    {
      label: 'Игрок',
      getVal: gameScore => <PlayerLink player={gameScore.player} />,
      filterType: 'text',
      filterField: 'player',
    },
    {
      label: 'Фраги',
      getVal: gameScore => <GameScoreKills missionFile={missionFile} kills={gameScore.frags} />,
      sortField: 'fragsCount',
      filterField: false,
    },
    {
      label: 'Тимкиллы',
      getVal: gameScore => <GameScoreKills missionFile={missionFile} kills={gameScore.teamKills} />,
      sortField: 'teamKillsCount',
      filterField: false,
    },
    {
      label: 'Убит врагом',
      getVal: gameScore => <GameScoreKills missionFile={missionFile} kills={gameScore.killers} />,
      sortField: 'killersCount',
      filterField: false,
    },
    {
      label: 'Убит тимкиллом',
      getVal: gameScore => <GameScoreKills missionFile={missionFile} kills={gameScore.teamKillers} />,
      sortField: 'teamKillersCount',
      filterField: false,
    },
  ]

  return (
    <HorizontalTable
      cols={gameStatsTableCols}
      rows={gameScores}
      isFetching={isFetching || !!error}
      defaultSortField='fragsCount'
    />
  )
}

export default GameScores
