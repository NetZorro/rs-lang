import React from "react";

import { CategoryWords } from "../../components/CategoryWords";
import "./words.css";

/**
 * страница вывода слов
 *
 */

type WordsProps = {
  group: string;
  // id: string
  match: { params: { number: string } };
};

const Words: React.FC<WordsProps> = (props) => {
  const { number } = props.match.params;
  const { group } = props;
  console.log(props);
  console.log(group);
  return (
    <div className="words">
      <CategoryWords group={group} id={number} />
    </div>
  );
};

export default Words;
