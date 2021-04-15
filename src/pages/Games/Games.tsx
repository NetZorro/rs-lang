import { Link } from "react-router-dom";

import './games.css';

export const Games: React.FC = () => {
  return (
    <div>
        <h1 className="games__title">Games</h1>
      <div className="word__games">
        <div className="word__game word__game-audiovyzov">
          <Link to={`/games/audiocall/textbook`}></Link>
        </div>
        <div className="word__game word__game-speakIt">
          <Link to={`/games/speakit/textbook`}></Link>
        </div>
        <div className="word__game word__game-savanna">
          <Link to={`/games/savannah/textbook`}></Link>
        </div>
        <div className="word__game word__game-sprint">
          <Link to={`/games/sprint/textbook`}></Link>
        </div>
      </div>
    </div>
  );
};
