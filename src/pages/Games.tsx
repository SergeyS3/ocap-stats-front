import { useContext } from 'react'
import useTitle from '@/hooks/useTitle'
import { fetchGames } from '@/services/bot-api'
import Block from '@/layouts/Block'
import Table from '@/layouts/Table/Table'
import { gamesTableCols } from '@/config/tables/games'
import { ProjectContext } from '@/App'
import { useQuery } from '@tanstack/react-query'


const Games = () => {
  useTitle('Игры')

  const project = useContext(ProjectContext)
  const { isFetching, error, refetch, data: games } = useQuery({
    queryKey: ['games', project],
    queryFn: () => fetchGames(project),
    initialData: [],
  })

  return (
    <Block>
      <Table
        cols={gamesTableCols}
        rows={games}
        isFetching={isFetching || !!error}
        refetch={refetch}
        defaultSortField='startedAt'
      />
    </Block>
  )
}

export default Games
