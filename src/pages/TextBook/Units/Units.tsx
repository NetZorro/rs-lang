import { Link } from "react-router-dom";

import { units } from "constants/data";
import "./units.css";

type UnitsProps = {
  match: { params: { categoryId: string } };
};

/**
  *
   Страница отвечает за вывод юнитов учебника 
   fdafsaf
  */
export const Units: React.FC<UnitsProps> = (props) => {
  const { categoryId } = props.match.params;
  return (
    <div className="units">
      {units[+categoryId].map((item, index) => {
        return (
          <div className="units__card" key={index}>
            <Link to={`/textbook/category-${categoryId}/unit-${index}`}>
              <span className="units__title">Unit {index + 1}:</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
