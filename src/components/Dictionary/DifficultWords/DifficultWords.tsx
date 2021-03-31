import { useContext } from "react";
import { Context } from "reducers";
import { IWord } from "interfaces";
import { WordCard } from "components/CategoryWords/WordCard";

export const DifficultWords = () => {
  const { state} = useContext(Context);
  const { difficult } = state.dictionary;
  return (
    <div>
      {difficult.map((item: IWord, index: number) => {
        return <WordCard item={item} key={index} />;
      })}
    </div>
  );
};
