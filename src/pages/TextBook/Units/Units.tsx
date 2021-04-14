import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { units } from "constants/data";
import "./units.css";
import { useState } from "react";

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
  const [catId, setcatId] = useState<number>(+categoryId);

  const switchRouter = (path: string) => {
    const result = path.match(/([^\/]+)/) || "";
    switch (result[0]) {
      case "dictionary":
        return "dictionary";
      case "textbook":
        return "textbook";
    }
  };

  const handlePageClick = (data: any) => {
    const { selected } = data;
    setcatId(selected);
  };

  return (
    <div className="units">
      {units[catId].map((item, index) => {
        return (
          <div className="units__card" key={index}>
            <Link
              to={`/${switchRouter(
                path
              )}/category-${optional}-${catId}/unit-${index}`}
            >
              <span className="units__title">Unit {index + 1}:</span>
            </Link>
          </div>
        );
      })}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={units.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination__container"}
        activeClassName={"active"}
      />
    </div>
  );
};
