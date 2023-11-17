import { formatDatesRange } from '@/utils/date'


export const gamesTableCols: AnyTableCols<Game> = [
  {
    label: '#',
    getVal: game => game.index,
    filterField: false,
  },
  {
    label: 'Название',
    getVal: game => game.missionName,
    sortField: 'missionName',
    sortAscByDefault: true,
    filterType: 'text',
    filterField: 'missionName',
  },
  {
    label: 'Карта',
    getVal: game => game.world,
    sortField: 'world',
    sortAscByDefault: true,
    filterType: 'select',
    filterField: 'world',
  },
  {
    label: 'Дата',
    getVal: game => formatDatesRange(game.startedAt, game.endedAt),
    sortField: 'startedAt',
    filterType: 'date',
    filterField: 'startedAt',
  },
  {
    label: 'Длительность',
    getVal: game => game.duration,
    sortField: 'duration',
    filterField: false,
  },
  {
    label: 'Игроков',
    getVal: game => game.players,
    sortField: 'players',
    filterField: false,
  },
  {
    label: 'Фрагов',
    getVal: game => game.kills,
    sortField: 'kills',
    filterField: false,
  },
  {
    label: 'Тимкиллов',
    getVal: game => game.teamKills,
    sortField: 'teamKills',
    filterField: false,
  },
  {
    label: '',
    getVal: game =>
      <a
        href={`https://ocap.red-bear.ru/?file=${game.missionFile}&zoom=2.3&x=-128&y=128`}
        target='_blank'
        rel='noreferrer'
      >OCAP</a>,
    filterField: false,
  },
]
