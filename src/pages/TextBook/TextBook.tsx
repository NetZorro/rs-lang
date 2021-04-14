import { Link } from "react-router-dom";

import { category } from "constants/data";
import "./textBook.css";

/**
 *
  Компонент ссылок на юниты
 */
export const TextBook: React.FC = () => {
  return (
    <div className="textBook">
      <div className="textBook__list">
        {category.map((item) => (
          <Link key={item} to={`/textbook/category-textbook-${item}`}>
            <div className="textBook__item">{item + 1} Collection</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
