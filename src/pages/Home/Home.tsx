import { useContext } from "react";
import { Link } from "react-router-dom";

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
              Hello {login ? user?.name.slice(0,9) : "Guest"}
            </h1>
            <span className="banner__text">
              {login ? "How are you?" : "It's good to see you again."}
            </span>
            <img className="banner__img" src={man} alt="icon" />
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
          <h3 className="block__game-title">Games</h3>
          <div className="word__games">
            <div className="word__game word__game-audiovyzov">
              <Link to={`/games/audiocall/textbook`}></Link>
            </div>
            <div className="word__game word__game-speakIt">
              <Link to={`/games/speakit/textbook`}></Link>
            </div>
            <div className="word__game word__game-sprint">
              <Link to={`/games/savannah/textbook`}></Link>
            </div>
            <div className="word__game word__game-savanna">
              <Link to={`/games/savannah/textbook`}></Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
