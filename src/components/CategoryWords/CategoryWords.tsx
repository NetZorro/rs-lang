import React, { useState, useEffect } from "react";

import { baseURL } from "constants/baseURL";
import "./categoryWords.css";

type data = {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  id: string;
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
};

type CategoryWordsProps = {
  unit: string;
  category: string;
};
/**
 * Компанент вывода слов с API
 */

export const CategoryWords: React.FC<CategoryWordsProps> = ({
  unit,
  category,
}) => {
  const [data, setData] = useState<data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`${baseURL}words?group=${category}&page=${unit}`)
      .then((res) => res.json())
      .then(setData);
    setLoading(false);
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
  const loader = (
    <div className="word__loader">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
  return (
    <div className="word">
      {loading
        ? loader
        : data.map((item, index) => {
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
                      ({wordTranslate})
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
                    {textMeaningTranslate}
                  </p>
                  <p className="word__example">
                    {textExample}
                    <br />
                    {textExampleTranslate}
                  </p>
                </div>
                <div className="word__btn-groups">
                  <button className="btn-groups__difficult">difficult</button>
                  <button className="btn-groups__delete">delete</button>
                </div>
              </div>
            );
          })}
    </div>
  );
};
