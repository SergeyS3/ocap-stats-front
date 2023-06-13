import './Nav.css'
import { NavLink } from 'react-router-dom'


const Nav = () =>
  <nav>
    <ul>
      <li>
        <NavLink to='/' className='logo'>
          <span className='logo-rb'>RB</span> <span className='logo-ocap'>OCAP</span> stats
        </NavLink>
      </li>
      <li>
        <NavLink to='/games'>Игры</NavLink>
        <NavLink to='/players'>Игроки</NavLink>
      </li>
    </ul>
  </nav>

export default Nav
