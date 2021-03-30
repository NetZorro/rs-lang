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
