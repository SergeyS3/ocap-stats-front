import './Nav.css'
import { NavLink } from 'react-router-dom'
import routes from '@/config/routes'


const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' className='logo'>
            <span className='logo-rb'>RB</span> <span className='logo-ocap'>OCAP</span> stats
          </NavLink>
        </li>
        <li>
          <NavLink to={routes.games}>Игры</NavLink>
          <NavLink to={routes.players}>Игроки</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
