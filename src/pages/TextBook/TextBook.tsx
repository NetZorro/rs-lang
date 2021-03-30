import { Link } from "react-router-dom";

import "./textBook.css";

/**
 *
  Страница отвечает вывод категорий учебника
  и отображения ссылок для перехода в юнит
 */
export const TextBook: React.FC = () => {
  const category = [0, 1, 2, 3, 4, 5];
  return (
    <div className="textBook">
      <div className="textBook__list">
        {category.map((item) => (
          <Link key={item} to={`/textbook/category-${item}`}>
            <div className="textBook__item">{item + 1} Collection</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
