import useProject from '@/hooks/useProject'
import useTitle from '@/hooks/useTitle'
import { fetchPlayers } from '@/services/bot-api'
import Block from '@/layouts/Block'
import HorizontalTable from '@/layouts/tables/horizontal/HorizontalTable'
import { playersTableCols } from '@/config/tables/players'
import { useQuery } from '@tanstack/react-query'


const PlayersPage = () => {
  const { project } = useProject()
  const { isFetching, error, refetch, data: players } = useQuery({
    queryKey: ['players', project.code],
    queryFn: () => fetchPlayers(project.code),
    initialData: [],
  })

  useTitle(`${project.name}: Игроки`)

  return (
    <Block fullWidth>
      <HorizontalTable
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
