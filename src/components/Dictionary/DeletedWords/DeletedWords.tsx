import { useContext } from "react";
import { Context } from "reducer";
import { IWord } from "interfaces";
import { WordCard } from "components/CategoryWords/WordCard";

export const DeletedWords = () => {
  const { state } = useContext(Context);
  const { deleted } = state.dictionary;
  return (
    <div>
      {deleted.map((item: IWord) => {
        return <WordCard item={item} />;
      })}
    </div>
  );
};
