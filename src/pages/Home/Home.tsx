import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "reducer";
import man from "assets/icon/man.svg";
import gerl from 'assets/images/gerl.svg'
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
              Hello {login ? user?.name.slice(0, 9) : "Guest"}
            </h1>
            <span className="banner__text">
              Welcome to RS-lang 
            </span>
            <img className="banner__img" src={gerl} alt="icon" />
          </div>
          <div className="info">
            <h2 className="info__title">Info</h2>
            <div className="info__block">
              <div className="info__image info__image_1"></div>
              <div className="info__text">
                Saving statistics of learned words
              </div>
            </div>
            <div className="info__block">
              <div className="info__text">4 games of your choice</div>
              <div className="info__image info__image_2"></div>
            </div>
            <div className="info__block">
              <div className="info__image info__image_3"></div>
              <div className="info__text">3600 word textbook for learning</div>
            </div>
            <div className="info__block">
              <div className="info__text">Listening to words</div>
              <div className="info__image info__image_4"></div>
            </div>
          </div>
          <div className="video">
            <h2 className="video__title">Video</h2>
            <div className="video__block">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wyeX9w_dkYg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
          <div className="block">
            <h3 className="block__game-title">Games</h3>
            <div className="word__games">
              <div className="word__game word__game-audiovyzov">
                <Link to={`/games/audiocall/textbook`}></Link>
              </div>
              <div className="word__game word__game-speakIt">
                <Link to={`/games/speakit/textbook`}></Link>
              </div>
              <div className="word__game word__game-sprint">
                <Link to={`/games/sprint/textbook`}></Link>
              </div>
              <div className="word__game word__game-savanna">
                <Link to={`/games/savannah/textbook`}></Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="dictionary">
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
                  <div>
                    * Мини-игра «Скажи это» - создана для тренировки
                    произношения
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
          </div> */}
      </main>
    </div>
  );
};
