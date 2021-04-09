export const sortArrObj = (arr: object[]) => {
  return arr.filter((item, index) => {
    return (
      index ===
      arr.findIndex((obj) => {
        return JSON.stringify(obj) === JSON.stringify(item);
      })
    );
  });
};

const sS = sessionStorage;
export const userAuth = () => (sS.getItem("user") ? true : false);
export const userAuthObj = () => JSON.parse(sS.getItem("user") || "{}");
export const removeUserSessionStorage = () => sS.removeItem("user");
