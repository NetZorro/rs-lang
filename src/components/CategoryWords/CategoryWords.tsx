import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { wordsService, userWords } from "services";
import { Context } from "reducer";
import { WordCard } from "./WordCard";
import { IWord } from "Entities";
import "./categoryWords.css";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

type CategoryWordsProps = {
  unit: string;
  category: string;
  optional: string;
};

/**
 * Компанент вывода слов на странице слов
 */
export const CategoryWords: React.FC<CategoryWordsProps> = ({
  unit,
  category,
  optional,
}) => {
  const { state, dispatch } = useContext(Context);
  const { words, login, user } = state;
  const { userId } = user;
  const { addUserWords, getUserAggregatedWords, setUserWords } = userWords;
  const { getWords } = wordsService;
  const [loading, setLoading] = useState(true);
  const [unitId, setUnitId] = useState(unit);
  const history = useHistory();

  useEffect(() => {
    login ? fetchLoginWords() : fetchNoLoginWords(category, unitId);
  }, [unitId]);

  const fetchLoginWords = async () => {
    console.log("fetch");
    await getUserAggregatedWords(userId, category, unitId, optional).then(
      ({ status, data: [{ paginatedResults }] }) => {
        if (status === 200) {
          dispatch(actionAddWords(paginatedResults));
          setLoading(false);
        }
      }
    );
  };

  const fetchNoLoginWords = (category: string, unitId: string) => {
    getWords(category, unitId).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actionAddWords(data));
      }
    });
  };

  const handlerDelete = (item: IWord) => {
    if (login) {
      const { _id } = item;

      const addDeleteUserWordServer = async () => {
        await addUserWords(userId, _id!, "deleted");
        setTimeout(fetchLoginWords, 300);
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
        await addUserWords(user.userId, _id!, "difficulty");
        setTimeout(fetchLoginWords, 300);
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

  const handlerRestoreWordDelete = (item: any) => {
    if (login) {
      const { _id } = item;
      let result = `{"optional" : {"delete" : false}}`;

      return setUserWords(userId, _id, result).then(({ status, data }) => {
        if (status === 200) {
          setTimeout(fetchLoginWords, 300);
        }
      });
    }
  };

  const handlerRestoreWordDifficult = (item: any) => {
    if (login) {
      const { _id } = item;
      let result = `{"difficulty" : "easy"}`;

      return setUserWords(userId, _id, result).then(({ status, data }) => {
        if (status === 200) {
          setTimeout(fetchLoginWords, 300);
        }
      });
    }
  };
  const handlePageClick = (data: any) => {
    const { selected } = data;
    const { location } = history;
    const { pathname } = location;

    let result = pathname.slice(0, pathname.length - unitId.length);
    history.replace(`${result}${selected + 1}`);

    setUnitId(String(selected));
  };

  return (
    <div className="word">
      {loading ? (
        <ClipLoader />
      ) : (
        words.map((item: IWord, index: number) => {
          if (optional === "textbook") {
            return (
              <WordCard
                item={item}
                button2={handlerDelete}
                button1={handlerDifficult}
                button1Name={"Difficult"}
                key={index}
                hard={item?.userWord?.difficulty}
              />
            );
          } else if (optional === "deleted") {
            return (
              <WordCard
                item={item}
                button1={handlerRestoreWordDelete}
                button1Name={"Restore"}
                key={index}
                hard={item?.userWord?.difficulty}
              />
            );
          } else if (optional === "difficult") {
            return (
              <WordCard
                item={item}
                button1={handlerRestoreWordDifficult}
                button1Name={"Restore"}
                key={index}
                hard={item?.userWord?.difficulty}
              />
            );
          }
        })
      )}
      {loading ? null : (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={30}
          marginPagesDisplayed={2}
          pageRangeDisplayed={6}
          onPageChange={handlePageClick}
          containerClassName={"pagination__container"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

const actionAddWords = (data: object) => {
  return { type: "words__add", payload: { words: data } };
};
