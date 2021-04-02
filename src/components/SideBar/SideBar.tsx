import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "reducer";
import home from "../../assets/icon/home.svg";
import hat from "../../assets/icon/hat.svg";
import message from "../../assets/icon/message.svg";
import settings from "../../assets/icon/settings.svg";
import loginIco from "../../assets/icon/login.svg";
import "./sideBar.css";

/**
 *
 * Вывод меню .
 * Иконок приложения и авторизации
 */
export const SideBar: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { user, login } = state;
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
          <Link to="/games">
            <img className="menu__item" src={hat} alt="icon" />
          </Link>
          <Link to="/statistics">
            <img className="menu__item" src={message} alt="icon" />
          </Link>
          <Link to="/settings">
            <img className="menu__item" src={settings} alt="icon" />
          </Link>
        </div>
        <Link to="/authorization">
          <div
            onClick={() => {
              if (login) dispatch({ type: "user__logOut" });
            }}
            className="sidebar__login"
            style={
              login
                ? { backgroundColor: "white", borderRadius: "8px" }
                : { backgroundImage: `url("${loginIco}")` }
            }
          >
            {user.message ? (
              <span className="sidebar__login-icon">{user.name[0]}</span>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
};
