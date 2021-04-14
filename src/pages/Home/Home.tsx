import { useContext } from "react";

import { Context } from "reducer";
import man from "../../assets/icon/man.svg";
import "./home.css";

export const Home: React.FC = () => {
  const { state } = useContext(Context);
  const { login, user } = state;

  return (
    <div className="App">
      <main className="main">
        <div className="content">
          <div className="banner">
            <h1 className="banner__title">
              Hello {login ? user.name : "Guest"}
            </h1>
            <span className="banner__text">
              {login ? "How are you?" : "It's good to see you again."}
            </span>
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
            {/* <div className="button-groups">
              <button className="button-groups__button-prev"></button>
              <button className="button-groups__button-next"></button>
            </div> */}
          </div>
          <div className="dictionary">
            <h2 className="dictionary__title">Application pros</h2>
            <div className="dictionary__card">
              <div className="dictionary__text-block">
                <h3 className="text-block__title">Friendly interface</h3>
                <span className="text-block__description">
                  Простой и дружественный интерфейс
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__text-block">
                <h3 className="text-block__title">Games</h3>
                <span className="text-block__description">
                  <div>
                    * Мини-игра «Саванна» - создана для активной тренировки
                    словарного запаса
                  </div>
                  <div>
                    * Мини-игра «Аудиовызов» - создана для тренировки слухового
                    восприятия слов
                  </div>
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__text-block">
                <h3 className="text-block__title">Dictionary</h3>
                <span className="text-block__description">
                  Большой словарь с возможность запоминания трудных слов
                </span>
              </div>
            </div>
            <div className="dictionary__card">
              <div className="dictionary__text-block">
                <h3 className="text-block__title">Personal settings</h3>
                <span className="text-block__description">
                  Возможность индивидуальной настройки приложения
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <h3 className="block__game-title">Games</h3>
          <div className="block__game"></div>
          <div className="block__game"></div>
          <div className="block__game"></div>
          <div className="block__game"></div>
        </div>
      </main>
    </div>
  );
};
