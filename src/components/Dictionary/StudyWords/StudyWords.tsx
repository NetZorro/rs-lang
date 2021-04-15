import { useContext, useLayoutEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

import { Context } from "reducer";
import { IWord } from "Entities";
import { WordCard } from "components/CategoryWords/WordCard";
import { userWords, authorization } from "services";

export const StudyWords: React.FC = () => {
  const { state } = useContext(Context);
  const { userId } = state.user;
  const { getUserStudyWords } = userWords;
  const { requestCancel } = authorization;
  const [words, setWords] = useState<[][]>([[]]);
  const [wordsLength, setWordsLength] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStudyWords = () => {
    return getUserStudyWords(userId).then(
      ({ status, data }: { status: number; data: any }) => {
        if (status === 200) {
          let arr: any = [];
          const { paginatedResults: result } = data[0];
          for (let i = 0; i < result.length; i += 20) {
            arr.push(result.slice(i, i + 20));
          }
          setWords(arr);
        }
        setLoading(false);
      }
    );
  };

  useLayoutEffect(() => {
    fetchStudyWords();
    return () => requestCancel();
  }, []);

  const handlePageClick = (data: any) => {
    const { selected } = data;

    setWordsLength(selected);
  };
  return (
    <div>
      {loading ? (
        <ClipLoader />
      ) : (
        words &&
        words.length > 0 &&
        words[wordsLength].map((item: IWord, index: number) => {
          return (
            <WordCard
              item={item}
              key={index}
              difficult={item.userWord?.difficulty}
              won={item.userWord?.optional?.won}
              lost={item.userWord?.optional?.lost}
            />
          );
        })
      )}
      {!loading && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={words.length}
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
