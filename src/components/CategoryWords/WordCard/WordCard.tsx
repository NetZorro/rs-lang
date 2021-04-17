import { useContext } from "react";
import cl from "classnames";

import { Context } from "reducer";
import { baseURL } from "constants/baseURL";
import { playAudio } from "../playAudio";
import "./wordCard.css";

export const WordCard = (props: any) => {
  const { item, difficult, button1, button2, button1Name, won, lost } = props;
  const { state } = useContext(Context);
  const { settings, login } = state;
  const {
    image,
    word,
    audio,
    group,
    transcription,
    textExample,
    textMeaning,
    wordTranslate,
    textMeaningTranslate,
    textExampleTranslate,
    audioExample,
    audioMeaning,
  } = item;

  const keysObjSettings = Object.keys(settings);

  const transformText = (text: string) => {
    return { __html: text };
  };

  return (
    <div className="word__card">
      <div
        className="word__image"
        style={{ backgroundImage: `url('${baseURL}${image}')` }}
      ></div>
      <div className="word__block">
        <div className="word__name">
          <span
            className={cl("word__title", { word__hard: difficult === "hard" })}
          >
            <span
              className={cl("category__indicator", {
                category__one: group === 0,
                category__two: group === 1,
                category__free: group === 2,
                category__four: group === 3,
                category__five: group === 4,
                category__six: group === 5,
              })}
            ></span>
            {word}
          </span>
          <span className="word__transcription">{transcription}</span>
          <span className="word__word-translate">
            {!settings[keysObjSettings[0]] ? `${wordTranslate}` : null}
          </span>
          <span
            className="word__sound"
            onClick={() => playAudio(audio, audioExample, audioMeaning)}
          ></span>
        </div>
        <p className="word__meaning">
          <span dangerouslySetInnerHTML={transformText(textMeaning)}></span>
          <br />
          {!settings[keysObjSettings[1]] ? (
            <span
              dangerouslySetInnerHTML={transformText(textMeaningTranslate)}
            ></span>
          ) : null}
        </p>
        <p className="word__example">
          <span dangerouslySetInnerHTML={transformText(textExample)}></span>
          <br />
          {!settings[keysObjSettings[2]] ? textExampleTranslate : null}
        </p>
        {won || lost ? (
          <p className="word__win-los-block">
            <span className="word__win-los">Win </span>: {won} 
            <span className="word__win-los"> Los </span>: {lost}
          </p>
        ) : null}
      </div>
      {!settings[keysObjSettings[3]] || button1Name === "Restore" ? (
        <div className="word__btn-groups">
          {button1 ? (
            <button
              onClick={() => login && button1(item)}
              className="btn-groups__difficult"
            >
              {button1Name}
            </button>
          ) : null}
          {button2 ? (
            <button
              onClick={() => login && button2(item)}
              className="btn-groups__delete"
            >
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
