import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><a className='home' href='/'>Home</a></li>
        <li><a className='page-1' href='#page-1'>Page 1</a></li>
        <li><a className='page-2' href='#page-2'>Page 2</a></li>
      </ul>
    </nav>
  </header>
)

export default Header
