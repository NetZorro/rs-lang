import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import cl from "classnames";

import { userWords } from "services";
import { Context } from "reducer";
import { category } from "constants/data";
import "./textBook.css";

/**
 *
  Компонент ссылок на юниты
 */
export const TextBook: React.FC = () => {
  const { state } = useContext(Context);
  const { login, user } = state;
  const { userId } = user;
  const { getWordsWithCategoryAll } = userWords;
  const [categoryId, setCategory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (login) {
      fetchLengthCategorys(6).then((arr) => {
        setCategory(arr);
        setLoading(false);
      });
    } else {
      setCategory(category);
      setLoading(false);
    }
  }, []);

  const fetchLengthCategorys = async (quantityCat: number) => {
    let result: any = [];

    for (let i = 0; i < quantityCat; i++) {
      await getWordsWithCategoryAll(userId, `${i}`, "textbook").then(
        ({ status, data }) => {
          if (status === 200) {
            const [{ paginatedResults }] = data;
            const { length } = paginatedResults;
            result.push(length);
          }
        }
      );
    }
    return result;
  };

  return (
    <div className="textBook">
      <div className="textBook__list">
        {loading ? (
          <ClipLoader />
        ) : (
          categoryId.map((item: number, index: number) => {
            if (login) {
              if (item === 0) {
                return (
                  <div
                    className="textBook__item"
                    style={{ backgroundColor: "aliceblue" }}
                  >
                    <span>
                      {index + 1} Collection
                      <span
                        className={cl("category__indicator", {
                          category__one: index === 0,
                          category__two: index === 1,
                          category__free: index === 2,
                          category__four: index === 3,
                          category__five: index === 4,
                          category__six: index === 5
                        })}
                      ></span>
                    </span>{" "}
                    <span>only : {item}</span>
                  </div>
                );
              }
              return (
                <Link key={index} to={`/textbook/category-textbook-${index}`}>
                  <div className="textBook__item">
                    <span>
                      {index + 1} Collection
                      <span
                        className={cl("category__indicator", {
                          category__one: index === 0,
                          category__two: index === 1,
                          category__free: index === 2,
                          category__four: index === 3,
                          category__five: index === 4,
                          category__six: index === 5
                        })}
                      ></span>
                    </span>
                    <span>only : {item}</span>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link key={index} to={`/textbook/category-textbook-${index}`}>
                  <div className="textBook__item">
                    <span>
                      {index + 1} Collection
                      <span
                        className={cl("category__indicator",{
                          category__one: index === 0,
                          category__two: index === 1,
                          category__free: index === 2,
                          category__four: index === 3,
                          category__five: index === 4,
                          category__six: index === 5
                        })}
                      ></span>
                    </span>
                  </div>
                </Link>
              );
            }
          })
        )}
      </div>
    </div>
  );
};
