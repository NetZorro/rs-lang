import { baseURL } from "constants/baseURL";
import { IUserReg, IUserAuth } from "interfaces/IAuthorization";

type response = {
  message: string;
  jwt: string;
  user: string;
};

export const authorization = {
  async userAuth(
    user: IUserAuth,
    dispatch: (action: { type: string; payload: object }) => {}
  ) {
    let result = await fetch(`${baseURL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    });
    let reply: JSON = await result.json();
    let addLocalStorage = (res: response) => {
      if (res.message) {
      } else {
        localStorage.setItem("token", res.jwt);
        // dispatch(loginUser(res.user));
      }
    };
  },
  async userReg(
    user: IUserReg,
    dispatch: (action: { type: string; payload: object }) => {}
  ) {
    let result = await fetch(`${baseURL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    });
    let reply: JSON = await result.json();
  },
};

const loginUser = (userObj: string) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
