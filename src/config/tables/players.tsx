import { AnyTableCols } from '@/types/table'
import PlayerLink from '@/components/links/PlayerLink'


export const playersTableCols: AnyTableCols<Player> = [
  {
    label: 'Игрок',
    getVal: playerStat => <PlayerLink player={playerStat.player} />,
    sortField: 'player',
    sortAscByDefault: true,
    filterType: 'text',
    filterField: 'player',
  },
  {
    label: 'Игр',
    getVal: playerStat => playerStat.games,
    sortField: 'games',
    filterField: false,
  },
  {
    label: 'Фрагов',
    getVal: playerStat => playerStat.frags,
    sortField: 'frags',
    filterField: false,
  },
  {
    label: 'Тимкиллов',
    getVal: playerStat => playerStat.teamKills,
    sortField: 'teamKills',
    filterField: false,
  },
  {
    label: 'Смертей',
    getVal: playerStat => playerStat.deaths,
    sortField: 'deaths',
    filterField: false,
  },
]
