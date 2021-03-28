import React from "react";
import { Link } from "react-router-dom";

import "./textBook.css";
/**
 *
  Страница отвечает вывод категорий учебника
  и отображения ссылок для перехода в юнит
 */

const TextBook: React.FC = () => {
  const category = [1, 2, 3, 4, 5, 6];
  return (
    <div className="textBook">
      <div className="textBook__list">
        {category.map((item) => (
          <Link key={item} to={`/textbook/category/${item}`}>
            <div  className="textBook__item">{item} Collection</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TextBook;
