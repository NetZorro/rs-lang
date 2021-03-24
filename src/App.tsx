import React from "react";

import ReactPlayer from "react-player";

// Render a YouTube video player

import "./App.css";
import home from "./assets/icon/home.svg";
import hat from "./assets/icon/hat.svg";
import message from "./assets/icon/message.svg";
import settings from "./assets/icon/settings.svg";
import login from "./assets/icon/login.svg";
import man from "./assets/icon/man.svg";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="sidebar">
        <span className="logo-app">RS.</span>
        <div className="menu">
          <img className="menu__item" src={home} alt="icon" />
          <img className="menu__item" src={hat} alt="icon" />
          <img className="menu__item" src={message} alt="icon" />
          <img className="menu__item" src={settings} alt="icon" />
        </div>
        <img className="login" src={login} alt="icon" />
      </div>
      <main className="main">
        <div className="content">
          <div className="banner">
            <h1 className="banner__title">Hello Guest</h1>
            <span className="banner__text">It's good to see you again.</span>
            <img className="banner__img" src={man} alt="icon" />
          </div>
          <div className="statistic">
            <div className="statistic__container">
              <div className="statistic__block"></div>
              <div className="statistic__text">
                <h2 className="statistic__title">English A2</h2>
                <p className="statistic__author">by Rodion Khahush</p>
              </div>
              <div className="statistic__progress">
                <span className="progress__procent">0%</span>
              </div>
              <button className="statistic__button">Continue</button>
            </div>
            <div className="button-groups">
              <button className="button-groups__button-prev"></button>
              <button className="button-groups__button-next"></button>
            </div>
          </div>
          <div className="dictionary">
            <h2 className="dictionary__title">Dictionary</h2>
            <div className="dictionary__tabs">
              <span>Tab</span>
              <span>Tab</span>
              <span>Tab</span>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__img-block"></div>
              <div className="dictionary__text-block">
                <h3 className="text-block__title">lorem</h3>
                <span className="text-block__description">
                  lorem lorem lorem
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__img-block"></div>
              <div className="dictionary__text-block">
                <h3 className="text-block__title">lorem</h3>
                <span className="text-block__description">
                  lorem lorem lorem
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__img-block"></div>
              <div className="dictionary__text-block">
                <h3 className="text-block__title">lorem</h3>
                <span className="text-block__description">
                  lorem lorem lorem
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__img-block"></div>
              <div className="dictionary__text-block">
                <h3 className="text-block__title">lorem</h3>
                <span className="text-block__description">
                  lorem lorem lorem
                </span>
              </div>
            </div>
          </div>
          <div className="video">
            <ReactPlayer
              width="620px"
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
        </div>
        <div className="block">
          <div className="block__profile">
            <div className="search">
              <input type="text"></input>
            </div>
            <div className="account"></div>
          </div>
          <h3>Games</h3>
          <div className="block__game"></div>
          <div className="block__game"></div>
          <div className="block__game"></div>
          <div className="block__game"></div>
        </div>
      </main>
    </div>
  );
};

export default App;
