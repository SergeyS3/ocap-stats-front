import { useContext } from 'react'
import useTitle from '../hooks/useTitle'
import { fetchGames } from '../services/bot-api'
import Block from '../layouts/Block'
import Table from '../layouts/Table/Table'
import { gamesTableCols } from '../data/tables/games'
import { ProjectContext } from '../App'
import Loader from '../components/Loader'
import { useQuery } from '@tanstack/react-query'


const Games = () => {
  useTitle('Игры')

  const project = useContext(ProjectContext)
  const { isLoading, error, data: games } = useQuery({
    queryKey: ['games', project],
    queryFn: () => fetchGames(project),
    initialData: [],
  })

  return (
    <Block>
      {isLoading || error
        ? <Loader />
        : <Table cols={gamesTableCols} rows={games} defaultSortField='startedAt' />
      }
    </Block>
  )
}

export default Games
