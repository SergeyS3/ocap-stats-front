import React from 'react'
import './Nav.css'


const Nav = () =>
  <nav>
    <ul>
      <li>
        <a href='/' className='logo'>
          <span className='logo-rb'>RB</span> <span className='logo-ocap'>OCAP</span> stats
        </a>
      </li>
      <li>
        <a href='/'>Menu item 1</a>
        <a href='/'>Menu item 2</a>
      </li>
    </ul>
  </nav>

export default Nav
