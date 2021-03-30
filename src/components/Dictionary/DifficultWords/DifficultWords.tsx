import { useContext } from "react";
import { Context } from "reducers";
import { IWord } from "interfaces";

export const DifficultWords = () => {
  const { state, dispatch } = useContext(Context);
  const { difficult } = state.dictionary;
  return (
    <div>
      {difficult.map((item: IWord, index: number) => {
        return <div key={index}>{item.word}</div>;
      })}
    </div>
  );
};
