import { useState } from "react";
import cl from "classnames";

import {
  StudyWords,
  DifficultWords,
  DeletedWords,
} from "components/Dictionary";
import "./dictionary.css";

export const Dictionary: React.FC = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="dictionary">
      <div className="dictionary__tabs-block">
        <span
          className={cl({ "dictionary__title-tab_active": active === 1 })}
          onClick={() => setActive(1)}
        >
          Study words
        </span>
        <span
          className={cl({ "dictionary__title-tab_active": active === 2 })}
          onClick={() => setActive(2)}
        >
          Difficult words
        </span>
        <span
          className={cl({ "dictionary__title-tab_active": active === 3 })}
          onClick={() => setActive(3)}
        >
          Delete words
        </span>
      </div>
      <div
        className={cl("dictionary__studyWords dictionary__tab", {
          dictionary__tab_active: active === 1,
        })}
      >
        <StudyWords />
      </div>
      <div
        className={cl("dictionary__difficultWords dictionary__tab", {
          dictionary__tab_active: active === 2,
        })}
      >
        <DifficultWords />
      </div>
      <div
        className={cl("dictionary__deleteWords dictionary__tab", {
          dictionary__tab_active: active === 3,
        })}
      >
        <DeletedWords />
      </div>
    </div>
  );
};
