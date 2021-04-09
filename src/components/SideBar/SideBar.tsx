import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "reducer";
import home from "../../assets/icon/home.svg";
import hat from "../../assets/icon/hat.svg";
import message from "../../assets/icon/message.svg";
import settings from "../../assets/icon/settings.svg";
import cl from "classnames";
import "./sideBar.css";

/**
 *
 * Вывод меню .
 * Иконок приложения и авторизации
 */
export const SideBar: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { user, login } = state;
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__menu-mobile">
          <Link to="/">
            <span className="logo-app">RS.</span>
          </Link>
          <button
            className="sidebar__burger-button"
            onClick={() => {
              setShowMenuMobile(!showMenuMobile);
            }}
          >
            <span className="sidebar__burger-icon"></span>
          </button>
        </div>
        <div className={cl("menu", { menu_show: showMenuMobile })}>
          <Link to="/textbook">
            <img className="menu__item" src={home} alt="icon" />
          </Link>
          <Link to="/games">
            <img className="menu__item" src={hat} alt="icon" />
          </Link>
          <Link to="/dictionary">
            <img className="menu__item" src={message} alt="icon" />
          </Link>
          <Link to="/settings">
            <img className="menu__item" src={settings} alt="icon" />
          </Link>
        </div>
        <div
          className={cl("authorization__block", { menu_show: showMenuMobile })}
        >
          <Link to="/authorization">
            <div
              onClick={() => {
                if (login) dispatch({ type: "user__logOut" });
              }}
              className={cl("sidebar__login", {
                sidebar__login_active: login,
                sidebar__login_disable: !login,
              })}
            >
              {login ? (
                <span className="sidebar__login-icon">{user.name[0]}</span>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
