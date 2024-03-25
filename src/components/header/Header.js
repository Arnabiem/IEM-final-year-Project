import React, { useState } from "react"
import "./header.css"
import { Link } from "react-router-dom"
const Header = () => {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src='' alt='' />
            </div>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/series'>Series</Link>
              </li>
              <li>
                <Link to='/movies'>Movies</Link>
              </li>
              <li>
                <Link to='/pages'>Pages</Link>
              </li>
              <li>
                <Link to='/pricing'>Pricing</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <i className='fa fa-search'></i>
            <i class='fas fa-bell'></i>

       
            <i className='fas fa-user'></i>
           
            <button>Subscribe Now</button> 
          </div>
        </div>
      </header>
    </>
  )
}

export default Header