import { useEffect, useContext } from "react";

import { wordsService, userWords } from "services";
import { Context } from "reducer";
import { WordCard } from "./WordCard";
import { IWord } from "Entities";
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
  const { words, login, user } = state;
  const { userId } = user;
  const { addUserWords, getUserAggregatedWords } = userWords;
  const { getWords } = wordsService;

  useEffect(() => {
    login ? fetchLoginWords() : fetchNoLoginWords(category, unit);
  }, []);

  const fetchLoginWords = async () => {
    await getUserAggregatedWords(userId, category, unit, null).then(
      ({ status, data: [{ paginatedResults }] }) => {
        if (status === 200) {
          dispatch(actionAddWords(paginatedResults));
        }
      }
    );
  };

  const fetchNoLoginWords = (category: string, unit: string) => {
    getWords(category, unit).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actionAddWords(data));
      }
    });
  };

  const handlerDelete = (item: IWord) => {
    if (login) {
      const { _id } = item;

      const addDeleteUserWordServer = async () => {
        await addUserWords(userId, _id!, false, true);
        setTimeout(fetchLoginWords, 500);
      };

      addDeleteUserWordServer();
    } else {
      let result = words.filter(({ id }: IWord) => !(id === item.id));
      dispatch(actionAddWords(result));
    }
  };

  const handlerDifficult = (item: IWord) => {
    if (login) {
      const { _id } = item;

      const addDifficultServer = async () => {
        await addUserWords(user.userId, _id!, true, false);
        setTimeout(fetchLoginWords, 500);
      };

      addDifficultServer();
    } else {
      let result = words.map((element: IWord) => {
        if (element.id === item.id) {
          return {
            ...item,
            userWord: { difficulty: "hard" },
          };
        }
        return element;
      });
      dispatch(actionAddWords(result));
    }
  };

  return (
    <div className="word">
      {words.map((item: IWord, index: number) => {
        return (
          <WordCard
            item={item}
            deleted={handlerDelete}
            difficult={handlerDifficult}
            key={index}
            hard={item?.userWord?.difficulty}
          />
        );
      })}
    </div>
  );
};

const actionAddWords = (data: object) => {
  return { type: "words__add", payload: { words: data } };
};
