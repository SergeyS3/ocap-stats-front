import { useContext } from 'react'
import useTitle from '../hooks/useTitle'
import { fetchPlayers } from '../services/bot-api'
import Block from '../layouts/Block'
import Table from '../layouts/Table/Table'
import { playersTableCols } from '../data/tables/players'
import { ProjectContext } from '../App'
import { useQuery } from '@tanstack/react-query'


const Players = () => {
  useTitle('Игроки')

  const project = useContext(ProjectContext)
  const { isFetching, error, refetch, data: players } = useQuery({
    queryKey: ['players', project],
    queryFn: () => fetchPlayers(project),
    initialData: [],
  })

  return (
    <Block>
      <Table
        cols={playersTableCols}
        rows={players}
        isFetching={isFetching || !!error}
        refetch={refetch}
        defaultSortField='frags'
      />
    </Block>
  )
}

export default Players
