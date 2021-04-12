import { Link } from "react-router-dom";

import { units } from "constants/data";
import "./units.css";

type UnitsProps = {
  match: { params: { categoryId: string; optional: string }; path: string };
};

/**
  *
   Страница отвечает за вывод юнитов учебника 
   fdafsaf
  */
export const Units: React.FC<UnitsProps> = (props) => {
  const { params, path } = props.match;
  const { categoryId, optional } = params;

  const switchRouter = (path: string) => {
    const result = path.match(/([^\/]+)/) || "";
    switch (result[0]) {
      case "dictionary":
        return "dictionary";
      case "textbook":
        return "textbook";
    }
  };

  return (
    <div className="units">
      {units[+categoryId].map((item, index) => {
        return (
          <div className="units__card" key={index}>
            <Link
              to={`/${switchRouter(
                path
              )}/category-${optional}-${categoryId}/unit-${index}`}
            >
              <span className="units__title">Unit {index + 1}:</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
