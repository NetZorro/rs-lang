// import React from "react";
import "./units.css";
import { Link} from "react-router-dom";

import { units } from "constants/data";

type UnitsProps = {
  match: {number: string};
};

/**
  *
   Страница отвечает за вывод юнитов учебника 
   fdafsaf
  */
export const Units: React.FC<UnitsProps> = (props) => {
  const { number } = props.match;
  let test:number = +number;
  if (!test) test = 1;
  return (
    <div className="units">
      {units[test].map((item, index) => {
        return (
          <div className="units__card">
            <Link
              to={`/textbook/category/:categoryId/${index}`}
            >
              <span className="units__title">Unit {index + 1}:</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
