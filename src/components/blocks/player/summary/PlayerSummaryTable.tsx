import { useParams } from 'react-router-dom'
import { formatDate } from '@/utils/date'
import { round } from '@/utils/number'


type Props = {
  playerStats: PlayerStats
}

const PlayerSummaryTable = ({ playerStats }: Props) => {
  const { player } = useParams()

  const firstStat = playerStats.statHistory.find(s => s.isPlayed)!

  const rows: { label: string, value: string | number }[] = [
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
      <table>
        <tbody>
          <tr>
            <th colSpan={2}>
              {player}
            </th>
          </tr>
          {rows.map(({ label, value }) =>
            <tr key={label}>
              <td>{label}</td>
              <td>{value}</td>
            </tr>,
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerSummaryTable
