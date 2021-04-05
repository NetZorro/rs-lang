import axios from "axios";

import { IUserReg, IUserAuth } from "interfaces/IAuthorization";

export const authorization = {
  userAuth(user: IUserAuth, dispatch: any) {
    return axios
      .post("signin", JSON.stringify(user))
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(loginUser(data));
          sessionStorage.setItem("user", JSON.stringify(data));
          return true;
        }
        return false;
      });
  },
  userReg(user: IUserReg) {
    return axios
      .post("users", JSON.stringify(user))
      .then(({ status, data }) => {
        console.log(status);
        console.log(data);
      });
  },
  userNewToken(userId: string, refreshToken: string, dispatch: any) {
    axios
      .get(`users/${userId}/tokens`, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(loginUser(data));
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      });
  },
};

const loginUser = (userObj: Object) => ({
  type: "user__authorization",
  payload: userObj,
});
