export const userAuth = () => (sessionStorage.getItem("user") ? true : false);

export const userAuthObj = () =>
  JSON.parse(sessionStorage.getItem("user") || "{}");

export const removeUserSessionStorage = () => sessionStorage.removeItem("user");
