import { useContext, useLayoutEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Context } from "reducer";
import { IWord } from "Entities";
import { WordCard } from "components/CategoryWords/WordCard";
import { userWords } from "services";

export const StudyWords: React.FC = () => {
  const { state } = useContext(Context);
  const { userId } = state.user;
  const { getUserStudyWords } = userWords;
  const [words, setWords] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeleteWords = async () => {
    return getUserStudyWords(userId).then(
      ({ status, data }: { status: number; data: any }) => {
        if (status === 200) {
          const { paginatedResults } = data[0];
          setWords(paginatedResults);
        }
        setLoading(false)
      }
    );
  };

  useLayoutEffect(() => {
    fetchDeleteWords();
  }, []);

  return (
    <div>
      {loading ? (
        <ClipLoader />
      ) : (
        words.map((item: IWord, index: number) => {
          return (
            <WordCard
              item={item}
              key={index}
              hard={item.userWord?.difficulty}
            />
          );
        })
      )}
    </div>
  );
};
