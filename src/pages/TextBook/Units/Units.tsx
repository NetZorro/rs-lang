import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import cl from "classnames";

import { units } from "constants/data";
import { Context } from "reducer";
import { userWords, authorization } from "services";
import "./units.css";
import { useState, useEffect } from "react";

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
  const { state } = useContext(Context);
  const history = useHistory();
  const [catId, setCatId] = useState<number>(+categoryId);
  const [unitsArr, setUnitsArr] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, login } = state;
  const { userId } = user;
  const { getUserAggregatedWords } = userWords;
  const { requestCancel } = authorization;

  const switchRouter = (path: string) => {
    switch (path.match(/([^\/]+)/)![0]) {
      case "dictionary":
        return "dictionary";
      case "textbook":
        return "textbook";
      default:
        return "textbook";
    }
  };

  useEffect(() => {
    let cleanupFunction = true;
    if (login) {
      fetchLengthUnits(30).then((arr) => {
        if (cleanupFunction) setUnitsArr(arr);
        if (cleanupFunction) setLoading(false);
      });
    } else {
      if (cleanupFunction) setUnitsArr(units);
      if (cleanupFunction) setLoading(false);
    }
    return () => {
      requestCancel();
      cleanupFunction = false;
    };
  }, [catId]);

  const fetchLengthUnits = async (quantityCat: number) => {
    let result: number[] = [];
    for (let i = 0; i < quantityCat; i++) {
      await getUserAggregatedWords(userId, `${catId}`, `${i}`, optional).then(
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

  const handlePageClick = (data: any) => {
    const { selected } = data;
    const { location } = history;
    const { pathname } = location;
    let result = pathname.slice(0, pathname.length - catId.toString().length);

    setLoading(true);
    console.log(selected);
    history.replace(`${result}${selected}`);
    setCatId(selected);
  };

  return (
    <div className="units">
      {loading ? (
        <ClipLoader />
      ) : (
        unitsArr.map((item, index) => {
          if (login && item === 0) {
            return (
              <div
                className="units__card"
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "aliceblue",
                }}
              >
                <span className="units__title">
                  Unit {index + 1}:{" "}
                  <span
                    className={cl("category__indicator", {
                      category__one: catId === 0,
                      category__two: catId === 1,
                      category__free: catId === 2,
                      category__four: catId === 3,
                      category__five: catId === 4,
                      category__six: catId === 5,
                    })}
                  ></span>
                </span>
                <span className="units__title">only : {item}</span>
              </div>
            );
          } else if (login) {
            <div className="units__card" key={index}>
              <Link
                to={`/${switchRouter(
                  path
                )}/category-${optional}-${catId}/unit-${index}`}
              >
                <span className="units__title">
                  Unit {index + 1}:{" "}
                  <span
                    className={cl("category__indicator", {
                      category__one: catId === 0,
                      category__two: catId === 1,
                      category__free: catId === 2,
                      category__four: catId === 3,
                      category__five: catId === 4,
                      category__six: catId === 5,
                    })}
                  ></span>
                </span>
                <span className="units__title">only : {item}</span>
              </Link>
            </div>;
          } else {
            return (
              <div className="units__card" key={index}>
                <Link
                  to={`/${switchRouter(
                    path
                  )}/category-${optional}-${catId}/unit-${index}`}
                >
                  <span className="units__title">
                    Unit {index + 1}:
                    <span
                      className={cl("category__indicator", {
                        category__one: catId === 0,
                        category__two: catId === 1,
                        category__free: catId === 2,
                        category__four: catId === 3,
                        category__five: catId === 4,
                        category__six: catId === 5,
                      })}
                    ></span>
                  </span>
                </Link>
              </div>
            );
          }
          return (
            <div className="units__card" key={index}>
              {login ? (
                <Link
                  to={`/${switchRouter(
                    path
                  )}/category-${optional}-${catId}/unit-${index}`}
                >
                  <span className="units__title">
                    Unit {index + 1}:{" "}
                    <span
                      className={cl("category__indicator", {
                        category__one: catId === 0,
                        category__two: catId === 1,
                        category__free: catId === 2,
                        category__four: catId === 3,
                        category__five: catId === 4,
                        category__six: catId === 5,
                      })}
                    ></span>
                  </span>
                  <span className="units__title">only : {item}</span>
                </Link>
              ) : (
                <Link
                  to={`/${switchRouter(
                    path
                  )}/category-${optional}-${catId}/unit-${index}`}
                >
                  <span className="units__title">
                    Unit {index + 1}:{" "}
                    <span
                      className={cl("category__indicator", {
                        category__one: catId === 0,
                        category__two: catId === 1,
                        category__free: catId === 2,
                        category__four: catId === 3,
                        category__five: catId === 4,
                        category__six: catId === 5,
                      })}
                    ></span>
                  </span>
                </Link>
              )}
            </div>
          );
        })
      )}
      {!loading && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={6}
          marginPagesDisplayed={2}
          pageRangeDisplayed={6}
          onPageChange={handlePageClick}
          containerClassName={"pagination__container"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};
