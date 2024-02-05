import { useParams } from 'react-router-dom'
import { formatDate } from '@/utils/date'
import { round } from '@/utils/number'


type Props = {
  playerStats: PlayerStat[]
}

const PlayerSummaryTable = ({ playerStats }: Props) => {
  const { player } = useParams()

  const firstStat = playerStats.find(s => s.games === 1)!
  const lastStat = playerStats.at(-1)!

  const rows: { label: string, value: string | number }[] = [
    {
      label: 'Играет с',
      value: formatDate(firstStat.dateTime),
    },
    {
      label: 'Сыграно игр',
      value: lastStat.games,
    },
    {
      label: 'Фрагов',
      value: lastStat.frags,
    },
    {
      label: 'Тимкиллов',
      value: lastStat.teamKills,
    },
    {
      label: 'Выживаемость',
      value: `${round(100 / lastStat.games * lastStat.deaths, 2)}%`,
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
