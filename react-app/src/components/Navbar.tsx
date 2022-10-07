import { NavLink, Link} from "react-router-dom";
import React from 'react';
import "./Navbar.css"

const NavBar = () => {
  return (
    <nav className = "navbar-comp">
        
        <a className = 'navbar-left-container'>
            <NavLink to = "/">
                RiseDC logo
            </NavLink>
        </a>
        <a className = 'navbar-right-container'>
            <NavLink to="/">
            Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/settings">Contact</NavLink>
        </a>
        {/* <Link to ="">Test</Link> */}
    </nav>
  );
}

export default NavBar