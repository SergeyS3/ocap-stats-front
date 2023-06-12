import { useContext, useEffect, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { BotApi } from '../services/bot-api'
import Block from '../layouts/Block'
import Table from '../layouts/Table/Table'
import { playersTableCols } from '../data/tables/players'
import { ProjectContext } from '../App'
import Loader from '../components/Loader'


const Players = () => {
  useTitle('Игроки')

  const project = useContext(ProjectContext)
  const [playersStat, setPlayersStat] = useState([] as Player[])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    BotApi.players(project).then(players => {
      setIsLoading(false)
      setPlayersStat(players)
    })
  }, [project])

  return (
    <Block>
      {isLoading
        ? <Loader />
        : <Table cols={playersTableCols} rows={playersStat} defaultSortField='frags' />
      }
    </Block>
  )
}

export default Players
