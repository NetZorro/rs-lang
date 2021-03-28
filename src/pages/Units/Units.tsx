import React from "react";
import { Link, Route } from "react-router-dom";

import { units } from "../../consts/data";
import Words from '../Words';
import './units.css';


/**
 *
  Страница отвечает за вывод юнитов учебника 
  по переходу по ссылке с TextBook
 */

type UnitsProps = {
  match: object;
};

const CategoryTextBook: React.FC<UnitsProps> = (props: any) => {
  const { number } = props.match;
  let test = number;
  if (!test) test = 1;
  return (
    <div className="units">
      {units[test].map((item, index) => {
        return (
          <div className="units__card">
            <Link to={{ pathname : `/textbook/category/:number/unit/${index}`, state : index}}>
              <span className="units__title">Unit {index + 1}:</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTextBook;
