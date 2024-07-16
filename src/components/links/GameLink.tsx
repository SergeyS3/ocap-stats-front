import routes from '@/config/routes'
import { NavLink } from 'react-router-dom'
import useProject from '@/hooks/useProject'


type Props = {
  game: Game
}
const GameLink = ({ game }: Props) => {
  const { project } = useProject()

  return <NavLink to={routes.game(project.code, game.id)}>{game.missionName}</NavLink>
}

export default GameLink
