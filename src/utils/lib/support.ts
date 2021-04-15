export const userAuth = () => (sessionStorage.getItem("user") ? true : false);

export const userAuthObj = () =>
  JSON.parse(sessionStorage.getItem("user") || "{}");

export const removeUserSessionStorage = () => sessionStorage.removeItem("user");

export const loginUser = (userObj: Object) => ({
  type: "user__authorization",
  payload: userObj,
});

export const dispatchUserSettings = (data: any) => {
  return { type: "settings__update", payload: { settings: data } };
};
