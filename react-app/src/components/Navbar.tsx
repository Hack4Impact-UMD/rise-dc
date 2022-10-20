import { NavLink, Link} from "react-router-dom";
import React from 'react';
import "./Navbar.css"
import home from "./assets/home.png";
import log from "./assets/log.png";
import setting from "./assets/setting.png";
const NavBar = () => {
  return (
    <nav className = "navbar">
      <div className="buttons">
        <NavLink className="nav" to="/"> <img src={home} alt="Home" /> </NavLink>
        <NavLink className="nav" id="log" to="/log"> <img src={log} alt="Log" /></NavLink>
        <NavLink className="nav" id="settings" to="/settings"> <img src={setting} alt="Settings" /></NavLink>
      </div>   
    </nav>
  );
}

export default NavBar