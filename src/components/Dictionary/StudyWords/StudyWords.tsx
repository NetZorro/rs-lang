import { useContext } from "react";
import { Context } from "reducer";
import { IWord } from "Entities";
import { WordCard } from "components/CategoryWords/WordCard";

export const StudyWords = () => {
  const { state } = useContext(Context);
  const { study } = state.dictionary;
  return (
    <div>
      {study.map((item: IWord, index: number) => {
        return <WordCard item={item} key={index}/>;
      })}
    </div>
  );
};
