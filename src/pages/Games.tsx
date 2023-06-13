import { useContext, useEffect, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { BotApi } from '../services/bot-api'
import Block from '../layouts/Block'
import Table from '../layouts/Table/Table'
import { gamesTableCols } from '../data/tables/games'
import { ProjectContext } from '../App'
import Loader from '../components/Loader'


const Games = () => {
  useTitle('Игры')

  const project = useContext(ProjectContext)
  const [games, setGames] = useState([] as Game[])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    void BotApi.allGames(project).then(games => {
      setIsLoading(false)
      setGames(games)
    })
  }, [project])

  return (
    <Block>
      {isLoading
        ? <Loader />
        : <Table cols={gamesTableCols} rows={games} defaultSortField='startedAt' />
      }
    </Block>
  )
}

export default Games
