
import React from 'react'
import './NavBar.css'
import day from '../assets/day.png'
import night from '../assets/night.png'
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div style={{ display: "inline-flex", alignItems: "center", gap:"10px" }}>
        <img src={logo} alt='logo' className='logo' />
        <h2> Youtube Scraper </h2>
      </div>
      <img src={night} alt='mood' className='light-mood' />
    </div>
  )
}

export default NavBar
