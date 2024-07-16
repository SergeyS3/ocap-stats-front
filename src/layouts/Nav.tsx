import './Nav.css'
import { NavLink } from 'react-router-dom'
import routes from '@/config/routes'
import useProject from '@/hooks/useProject'


const Nav = () => {
  const { project } = useProject()

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' className='logo'>
            RB stats
          </NavLink>
        </li>
        <li>
          <NavLink to={routes.games(project.code)}>Игры</NavLink>
          <NavLink to={routes.players(project.code)}>Игроки</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
