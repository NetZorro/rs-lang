import { CategoryWords } from "components/CategoryWords";
import "./words.css";

type WordsProps = {
  // group: string;
  match: { params: { categoryId: string; unitId: string; optional: string } };
};

/**
 * Cтраница вывода слов
 *
 */
export const Words: React.FC<WordsProps> = (props) => {
  const { categoryId, unitId, optional } = props.match.params;

  return (
    <div className="words">
      <CategoryWords category={categoryId} unit={unitId} optional={optional}/>
    </div>
  );
};
