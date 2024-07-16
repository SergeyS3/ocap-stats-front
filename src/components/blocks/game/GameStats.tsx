import VerticalTable, { VerticalTableRow } from '@/layouts/tables/vertical/VerticalTable'
import { formatDate, formatTime } from '@/utils/date'


type Props = {
  gameStats: GameStats
}

const GameStats = ({ gameStats }: Props) => {
  const rows: VerticalTableRow[] = [
    {
      label: 'Карта',
      value: gameStats.world,
    },
    {
      label: 'Автор миссии',
      value: gameStats.author,
    },
    {
      label: 'Дата и время старта',
      value: `${formatDate(gameStats.startedAt)} ${formatTime(gameStats.startedAt)}`,
    },
    {
      label: 'Дата и время окончания',
      value: `${formatDate(gameStats.endedAt)} ${formatTime(gameStats.endedAt)}`,
    },
    {
      label: 'Длительность',
      value: gameStats.duration,
    },
    {
      label: 'Игроков',
      value: gameStats.players,
    },
    {
      label: 'Фрагов',
      value: gameStats.kills,
    },
    {
      label: 'Тимкиллов',
      value: gameStats.teamKills,
    },
  ]

  return (
    <div>
      <VerticalTable label={gameStats.missionName} rows={rows} />
    </div>
  )
}

export default GameStats
