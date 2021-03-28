import React from 'react'
import {Link} from 'react-router-dom'

import home from "../../assets/icon/home.svg";
import hat from "../../assets/icon/hat.svg";
import message from "../../assets/icon/message.svg";
import settings from "../../assets/icon/settings.svg";
import login from "../../assets/icon/login.svg";
import './sideBar.css';


/**
 * 
 * SideBar
 */
const SideBar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
        <Link to="/">
          <span className="logo-app">RS.</span>
        </Link>
        <div className="menu">
          <Link to="/textbook">
            <img className="menu__item" src={home} alt="icon" />
          </Link>
          <img className="menu__item" src={hat} alt="icon" />
          <img className="menu__item" src={message} alt="icon" />
          <Link to="/settings">
            <img className="menu__item" src={settings} alt="icon" />
          </Link>
        </div>
        <img className="login" src={login} alt="icon" />
      </div>
        </div>
    )
}

export default SideBar;