import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import cl from "classnames";

import { userWords, authorization } from "services";
import { Context } from "reducer";
import { category } from "constants/data";

type props = {
  optional: string;
};

export const DifficultWords: React.FC<props> = ({ optional }) => {
  const { state } = useContext(Context);
  const { login, user } = state;
  const { userId } = user;
  const { getWordsWithCategoryAll } = userWords;
  const { requestCancel } = authorization;
  const [categoryId, setCategory] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cleanupFunction = true;
    if (login) {
      fetchLengthCategorys(6).then((arr) => {
        if (cleanupFunction) setCategory(arr);
        if (cleanupFunction) setLoading(false);
      });
    } else {
      if (cleanupFunction) setCategory(category);
      if (cleanupFunction) setLoading(false);
    }
    return () => {
      requestCancel();
      cleanupFunction = false;
    };
  }, []);

  const fetchLengthCategorys = async (quantityCat: number) => {
    let result: any = [];

    for (let i = 0; i < quantityCat; i++) {
      await getWordsWithCategoryAll(userId, `${i}`, optional).then(
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
    <>
      {loading ? (
        <ClipLoader />
      ) : (
        categoryId.map((item: number, index: number) => {
          if (login) {
            if (item === 0) {
              return (
                <div
                  key={index}
                  className="dictionary__item-block"
                  style={{
                    backgroundColor: "aliceblue",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {index + 1} Collection{" "}
                    <span
                      className={cl("category__indicator", {
                        category__one: index === 0,
                        category__two: index === 1,
                        category__free: index === 2,
                        category__four: index === 3,
                        category__five: index === 4,
                        category__six: index === 5,
                      })}
                    ></span>
                  </span>

                  <span>only : {item}</span>
                </div>
              );
            }
            return (
              <div key={index} className="dictionary__item-block">
                <Link to={`/dictionary/category-${optional}-${index}`}>
                  <span>
                    {index + 1} Collection
                    <span
                      className={cl("category__indicator", {
                        category__one: index === 0,
                        category__two: index === 1,
                        category__free: index === 2,
                        category__four: index === 3,
                        category__five: index === 4,
                        category__six: index === 5,
                      })}
                    ></span>
                  </span>

                  <span>only : {item}</span>
                </Link>
              </div>
            );
          } else {
            return (
              <div key={index} className="dictionary__item-block">
                <Link to={`/dictionary/category-${optional}-${index}`}>
                  <span>
                    {index + 1} Collection
                    <span
                      className={cl("category__indicator", {
                        category__one: index === 0,
                        category__two: index === 1,
                        category__free: index === 2,
                        category__four: index === 3,
                        category__five: index === 4,
                        category__six: index === 5,
                      })}
                    ></span>
                  </span>
                </Link>
              </div>
            );
          }
        })
      )}
    </>
  );
};
