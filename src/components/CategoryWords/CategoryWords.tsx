import { useEffect, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, Link } from "react-router-dom";

import {
  wordsService,
  userWords,
  serviceSettings,
  authorization,
} from "services";
import { dispatchUserSettings } from "utils/lib";
import ClipLoader from "react-spinners/ClipLoader";
        
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
  const { requestCancel } = authorization;
  const [loading, setLoading] = useState(true);
  const [unitId, setUnitId] = useState(unit);
  const history = useHistory();
  const { getSettings } = serviceSettings;
  const responseTimeout = 300;

  useEffect(() => {
    login ? fetchLoginWords() : fetchNoLoginWords(category, unitId);
    if (login) {
      getSettings(userId).then(({ status, data }) => {
        if (status === 200) {
          dispatch(dispatchUserSettings(data.optional));
        }
      });
    }
    return () => requestCancel();
  }, [unitId]);

  const fetchLoginWords = () => {
    getUserAggregatedWords(userId, category, unitId, optional).then(
      ({ status, data: [{ paginatedResults }] }) => {
        if (status === 200) {
          if (paginatedResults.length === 0) {
            history.goBack();
          }
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
        setLoading(false);
      }
    });
  };

  const handlerDelete = (item: IWord) => {
    if (login) {
      const { _id } = item;

      const addDeleteUserWordServer = async () => {
        await addUserWords(userId, _id!, "deleted");
        setTimeout(fetchLoginWords, responseTimeout);
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
        setTimeout(fetchLoginWords, responseTimeout);
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
          setTimeout(fetchLoginWords, responseTimeout);
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
          setTimeout(fetchLoginWords, responseTimeout);
        }
      });
    }
  };
  const handlePageClick = (data: any) => {
    const { selected } = data;
    const { location } = history;
    const { pathname } = location;

    let result = pathname.slice(0, pathname.length - unitId.length);
    history.replace(`${result}${selected}`);
    setLoading(true);

    setUnitId(`${selected}`);
  };

  return (
    <div className="word">
      {optional !== "deleted" && (
        <div className="word__games">
          <div className="word__game word__game-speakIt">
            <Link
              to={
                login
                  ? `/games/speakit/${optional}/${category}/${unitId}`
                  : `/games/speakit/textbook`
              }
            ></Link>
          </div>
          <div className="word__game word__game-sprint">
            <Link
              to={
                login
                  ? `/games/sprint/${optional}/${category}/${unitId}`
                  : `/games/sprint/textbook`
              }
            ></Link>
          </div>
          <div className="word__game word__game-audiovyzov">
            <Link
              to={
                login
                  ? `/games/audiocall/${optional}/${category}/${unitId}`
                  : `/games/audiocall/textbook`
              }
            ></Link>
          </div>
          <div className="word__game word__game-savanna">
            <Link
              to={
                login
                  ? `/games/savannah/${optional}/${category}/${unitId}`
                  : `/games/savannah/textbook`
              }
            ></Link>
          </div>
        </div>
      )}

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
                difficult={item?.userWord?.difficulty}
                won={item?.userWord?.optional?.won}
                lost={item?.userWord?.optional?.lost}
              />
            );
          } else if (optional === "deleted") {
            return (
              <WordCard
                item={item}
                button1={handlerRestoreWordDelete}
                button1Name={"Restore"}
                key={index}
                difficult={item?.userWord?.difficulty}
                won={item?.userWord?.optional?.won}
                lost={item?.userWord?.optional?.lost}
              />
            );
          } else if (optional === "difficult") {
            return (
              <WordCard
                item={item}
                button1={handlerRestoreWordDifficult}
                button1Name={"Restore"}
                key={index}
                difficult={item?.userWord?.difficulty}
                won={item?.userWord?.optional?.won}
                lost={item?.userWord?.optional?.lost}
              />
            );
          }
        })
      )}
      {!loading && (
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
