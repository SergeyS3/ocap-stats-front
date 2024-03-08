import { useParams } from 'react-router-dom'
import { formatDate } from '@/utils/date'
import { round } from '@/utils/number'
import VerticalTable, { VerticalTableRow } from '@/layouts/tables/vertical/VerticalTable'


type Props = {
  playerStats: PlayerStats
}

const PlayerSummaryTable = ({ playerStats }: Props) => {
  const { player } = useParams()

  const firstStat = playerStats.statHistory.find(s => s.isPlayed)!

  const rows: VerticalTableRow[] = [
    {
      label: 'Играет с',
      value: formatDate(firstStat.dateTime),
    },
    {
      label: 'Сыграно игр',
      value: playerStats.games,
    },
    {
      label: 'Фрагов',
      value: playerStats.frags,
    },
    {
      label: 'Тимкиллов',
      value: playerStats.teamKills,
    },
    {
      label: 'Выживаемость',
      value: `${round(100 / playerStats.games * playerStats.deaths, 2)}%`,
    },
  ]

  return (
    <div>
      <VerticalTable label={player} rows={rows} />
    </div>
  )
}

export default PlayerSummaryTable
