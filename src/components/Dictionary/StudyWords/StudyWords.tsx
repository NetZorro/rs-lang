import { useContext } from "react";
import { Context } from "reducers";

export const StudyWords = () => {
  const { state, dispatch } = useContext(Context);
  const { study } = state.dictionary;
  return <div>{study.map((item: object) => {
    return <div>{item}</div>
  })}</div>;
};
