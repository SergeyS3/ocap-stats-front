import { useContext } from 'react'
import useTitle from '../hooks/useTitle'
import { fetchPlayers } from '../services/bot-api'
import Block from '../layouts/Block'
import Table from '../layouts/Table/Table'
import { playersTableCols } from '../data/tables/players'
import { ProjectContext } from '../App'
import Loader from '../components/Loader'
import { useQuery } from 'react-query'


const Players = () => {
  useTitle('Игроки')

  const project = useContext(ProjectContext)
  const { isLoading, error, data: players } = useQuery<Player[]>(['players', project], () => fetchPlayers(project))

  return (
    <Block>
      {isLoading || error
        ? <Loader />
        : <Table cols={playersTableCols} rows={players!} defaultSortField='frags' />
      }
    </Block>
  )
}

export default Players
