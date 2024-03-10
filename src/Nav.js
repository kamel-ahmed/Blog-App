import React from 'react'
import {Link} from 'react-router-dom'


const Nav = ({search , setSearch}) => {
  return (
    <nav className="Nav">

      <form className="searchForm" onSubmit={(e)=> e.preventDefault()} >

        <label htmlFor="search">search posts</label>
        <input 
          id="search" 
          type="text"
          placeholder='search post'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>

      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/newpost">newpost</Link></li>
        <li><Link to="/about">about</Link></li>
      
      </ul>
    </nav>
  )
}

export default Nav
