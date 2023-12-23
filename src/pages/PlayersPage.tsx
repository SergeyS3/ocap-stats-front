import { useProjectContext } from '@/context/ProjectContextProvider'
import useTitle from '@/hooks/useTitle'
import { fetchPlayers } from '@/services/bot-api'
import Block from '@/layouts/Block'
import Table from '@/layouts/Table/Table'
import { playersTableCols } from '@/config/tables/players'
import { useQuery } from '@tanstack/react-query'


const PlayersPage = () => {
  const { project } = useProjectContext()
  const { isFetching, error, refetch, data: players } = useQuery({
    queryKey: ['players', project.code],
    queryFn: () => fetchPlayers(project.code),
    initialData: [],
  })

  useTitle(`${project.name}: Игроки`)

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

export default PlayersPage
