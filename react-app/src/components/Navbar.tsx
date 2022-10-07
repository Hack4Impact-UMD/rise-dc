import { NavLink } from "react-router-dom";
import React from 'react';
import "./Navbar.css"

export function NavBar() {
  return (

    <nav>
        <a className = 'navbar-left-container'>
            <NavLink to = "/">
                RiseDC logo
            </NavLink>
            <p>Temp </p>
        </a>
        <a className = 'navbar-right-container'>
            <NavLink to="/">
            Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/settings">Contact</NavLink>
        </a>
    </nav>
  );
}