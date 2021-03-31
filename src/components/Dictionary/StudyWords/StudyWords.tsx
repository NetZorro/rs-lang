import { useContext } from "react";
import { Context } from "reducers";
import { IWord } from "interfaces";
import { WordCard } from "components/CategoryWords/WordCard";

export const StudyWords = () => {
  const { state } = useContext(Context);
  const { study } = state.dictionary;
  return (
    <div>
      {study.map((item: IWord) => {
        return <WordCard item={item} />;
      })}
    </div>
  );
};
