import React from "react";


import man from "../../assets/icon/man.svg";
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="App">
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

export default Home;
