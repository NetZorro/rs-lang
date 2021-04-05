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

export const userAuth = () => (sessionStorage.getItem("user") ? true : false);
export const userAuthObj = () =>
  JSON.parse(sessionStorage.getItem("user") || "{}");
export const removeUserSessionStorage = () => sessionStorage.removeItem("user");