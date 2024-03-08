import useProject from '@/hooks/useProject'
import useTitle from '@/hooks/useTitle'
import { fetchGames } from '@/services/bot-api'
import Block from '@/layouts/Block'
import HorizontalTable from '@/layouts/tables/horizontal/HorizontalTable'
import { gamesTableCols } from '@/config/tables/games'
import { useQuery } from '@tanstack/react-query'


const GamesPage = () => {
  const { project } = useProject()
  const { isFetching, error, refetch, data: games } = useQuery({
    queryKey: ['games', project.code],
    queryFn: () => fetchGames(project.code),
    initialData: [],
  })

  useTitle(`${project.name}: Игры`)

  return (
    <Block fullWidth>
      <HorizontalTable
        cols={gamesTableCols}
        rows={games}
        isFetching={isFetching || !!error}
        refetch={refetch}
        defaultSortField='startedAt'
      />
    </Block>
  )
}

export default GamesPage
