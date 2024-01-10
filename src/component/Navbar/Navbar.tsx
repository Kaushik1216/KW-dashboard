import React from 'react'
import './navbar.css'
import {Link,useNavigate} from'react-router-dom'
// import { useState,useEffect } from 'react'

interface props{
    user: String
    changeuser: Function
}
 const Navbar: React.FC<props> = ({user , changeuser})=> {

const logout = ()=>{
    changeuser(" ");
}
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container container">
            <input type="checkbox" />
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
                <ul className="menu-items">
                   {user==" " &&  <li><Link to="/register">Register</Link></li>}
                   {user ==" " &&  <li><Link to="/login">Login</Link></li>}
                   {user!==" " &&  <li><Link to="/login" onClick={logout}>Logout</Link></li>}
                   {user!==" " && <li><Link to="/chatbot">Chatbot</Link></li>}
                   {user!==" " &&  <li><Link to="/dashboard">Dashboard</Link></li>}
                   {user!==" " &&  <li><Link to="/dashboard">{user}</Link></li>}
                </ul>
                <h2 className="logo" style={{margin:0}}>KW-SOL</h2>
        </div>
    </nav>
    </>
  )
}

export default Navbar;