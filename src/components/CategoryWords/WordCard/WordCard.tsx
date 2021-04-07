import { useContext } from "react";
import cl from 'classnames'

import { Context } from "reducer";
import { baseURL } from "constants/baseURL";
import { playAudio } from "../playAudio";
import "./wordCard.css";

export const WordCard = (props: any) => {
  const { item, deleted, difficult , hard } = props;
  const { state } = useContext(Context);
  const { settings } = state;
  const {
    image,
    word,
    audio,
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
          <span className={cl("word__title", {"word__hard" : hard})}>{word}</span>
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
      </div>
      {!settings[keysObjSettings[3]] ? (
        <div className="word__btn-groups">
          {deleted ? (
            <button
              onClick={() => difficult(item)}
              className="btn-groups__difficult"
            >
              difficult
            </button>
          ) : null}
          {difficult ? (
            <button
              onClick={() => deleted(item)}
              className="btn-groups__delete"
            >
              delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
