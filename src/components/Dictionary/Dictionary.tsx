import { useState } from "react";

import {
  StudyWords,
  DifficultWords,
  DeletedWords,
} from "components/Dictionary";
import "./dictionary.css";

export const Dictionary = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="dictionary">
      <div className="dictionary__tabs-block">
        <span onClick={() => setActive(1)}>Study words</span>
        <span onClick={() => setActive(2)}>Difficult words</span>
        <span onClick={() => setActive(3)}>Delete words</span>
      </div>
      <div
        className={`dictionary__studyWords dictionary__tab ${
          active === 1 ? "dictionary__tab_active" : ""
        }`}
      >
        <StudyWords />
      </div>
      <div
        className={`dictionary__HardWords  dictionary__tab ${
          active === 2 ? "dictionary__tab_active" : ""
        }`}
      >
        <DifficultWords />
      </div>
      <div
        className={`dictionary__deleteWords  dictionary__tab ${
          active === 3 ? "dictionary__tab_active" : ""
        }`}
      >
        <DeletedWords />
      </div>
    </div>
  );
};
