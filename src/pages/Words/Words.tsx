import React from "react";

import "./words.css";

type WordsProps = {
  group: string;
  // id: string
  match: { params: { number: string } };
};

/**
 * Cтраница вывода слов
 *
 */
export const Words: React.FC<WordsProps> = (props) => {
  const { number } = props.match.params;
  const { group } = props;
  console.log(props);
  console.log(group);
  return (
    <div className="words">
      {/* <CategoryWords group={group} id={number} /> */}
    </div>
  );
};
