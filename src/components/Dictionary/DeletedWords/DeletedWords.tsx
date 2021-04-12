import { Link } from "react-router-dom";

import { category } from "constants/data";

export const DeletedWords: React.FC = () => {
  return (
    <div>
      {category.map((unit: number, index: number) => {
        return (
          <div key={index} className="dictionary__item-block">
            <Link to={`/dictionary/category-deleted-${index}`}>
              {index + 1} Collection
            </Link>
          </div>
        );
      })}
    </div>
  );
};