import { Link } from "react-router-dom";

import { category } from "constants/data";

export const DifficultWords: React.FC = () => {
  return (
    <div>
      {category.map((unit: number, index: number) => {
        return (
          <div key={index} className="dictionary__item-block">
            <Link to={`/dictionary/category-difficult-${index}`}>
              {index + 1} Collection
            </Link>
          </div>
        );
      })}
    </div>
  );
};
