import { useEffect, useContext } from "react";

import { wordsService } from "services";
import { Context } from "reducers";
import { sortArrObj } from "utils/lib";
import { WordCard } from "./WordCard";
import { IWord } from "interfaces";
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
  const { settings, words, dictionary } = state;
  useEffect(() => {
    wordsService
      .getWords(category, unit)
      .then((resolve) =>
        dispatch({ type: "words__add", payload: { ...state, words: resolve } })
      );
  }, []);
  const handlerDelete = (item: object) => {
    dispatch({
      type: "words__add",
      payload: {
        ...state,
        dictionary: {
          ...dictionary,
          deleted: sortArrObj([...dictionary.deleted, item]),
        },
      },
    });
  };
  const handlerDifficult = (item: object) => {
    dispatch({
      type: "words__add",
      payload: {
        ...state,
        dictionary: {
          ...dictionary,
          difficult: sortArrObj([...dictionary.difficult, item]),
        },
      },
    });
  };
  return (
    <div className="word">
      {words.map((item: IWord, index: number) => {
        return (
          <WordCard
            item={item}
            settings={settings}
            deleted={handlerDelete}
            difficult={handlerDifficult}
          />
        );
      })}
    </div>
  );
};
