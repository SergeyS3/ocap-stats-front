import routes from '@/config/routes'
import { NavLink } from 'react-router-dom'
import useProject from '@/hooks/useProject'


type Props = {
  player: string
}
const PlayerLink = ({ player }: Props) => {
  const { project } = useProject()

  return <NavLink to={routes.player(project.code, player)}>{player}</NavLink>
}

export default PlayerLink
