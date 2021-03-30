import { useContext } from "react";
import { Context } from "reducers";
import { IWord } from "interfaces";
import { WordCard } from "components/CategoryWords/WordCard";

export const DeletedWords = () => {
  const { state, dispatch } = useContext(Context);
  const { deleted } = state.dictionary;
  return (
    <div>
      {deleted.map((item: IWord, index: number) => {
        return <div key={index}>{item.word}</div>;
      })}
    </div>
  );
};
