import { formatDatesRange } from '@/utils/date'
import { AnyTableCols } from '@/types/table'
import OcapLink from '@/components/links/OcapLink'
import GameLink from '@/components/links/GameLink'


export const gamesTableCols: AnyTableCols<Game> = [
  {
    label: 'Название',
    getVal: game => <GameLink game={game} />,
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
    getVal: game => <OcapLink missionFile={game.missionFile} />,
    filterField: false,
  },
]
