import { useEffect, useContext } from "react";

import { wordsService } from "services";
import { baseURL } from "constants/baseURL";
import { Context } from "reducers";
import "./categoryWords.css";

type CategoryWordsProps = {
  unit: string;
  category: string;
};

/**
 * Компанент вывода слов на странице слов
 */
export const CategoryWords: React.FC<CategoryWordsProps> = ({
  unit,
  category,
}) => {
  const { state, dispatch } = useContext(Context);
  const { settings, words } = state;
  const keysObjSettings = Object.keys(settings);
  useEffect(() => {
    wordsService
      .getWords(category, unit)
      .then((resolve) =>
        dispatch({ type: "add__words", payload: { ...state, words: resolve } })
      );
  }, []);
  const handlerAudio = async (...args: string[]) => {
    let result = args.map(
      (audioURL: string) => new Audio(`${baseURL}${audioURL}`)
    );
    const playMusic = (audio: any) => {
      return new Promise((resolve) => {
        audio.play();
        audio.addEventListener("ended", resolve);
      });
    };
    for (let i = 0; i < result.length; i++) {
      await playMusic(result[i]);
    }
  };
  return (
    <div className="word">
      {words.map((item: any) => {
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
        return (
          <div className="word__card">
            <div
              className="word__image"
              style={{ backgroundImage: `url('${baseURL}${image}')` }}
            ></div>
            <div className="word__block">
              <div className="word__name">
                <span className="word__title">{word}</span>
                <span className="word__transcription">{transcription}</span>
                <span className="word__word-translate">
                  {keysObjSettings[0] ? `${wordTranslate}` : null}
                </span>
                <span
                  className="word__sound"
                  onClick={() =>
                    handlerAudio(audio, audioExample, audioMeaning)
                  }
                ></span>
              </div>
              <p className="word__meaning">
                {textMeaning}
                <br />
                {keysObjSettings[1] ? textMeaningTranslate : null}
              </p>
              <p className="word__example">
                {textExample}
                <br />
                {keysObjSettings[2] ? textExampleTranslate : null}
              </p>
            </div>
            {keysObjSettings[3] ? (
              <div className="word__btn-groups">
                <button className="btn-groups__difficult">difficult</button>
                <button className="btn-groups__delete">delete</button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
