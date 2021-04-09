import axios from "axios";

import { IUserReg, IUserAuth } from "Entities/IAuthorization";
import { baseURL } from "constants/baseURL";
import { loginUser } from "utils/lib";

export const authorization = {
  async sigIn(user: IUserAuth) {
    return axios.post("signin", user);
  },

  async register(user: IUserReg) {
    return axios.post("users", user);
  },

  async userNewToken(userId: string, refreshToken: string) {
    return axios.get(`users/${userId}/tokens`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
  },
  axiosSettings(state: any, dispatch: any) {
    const { userNewToken } = authorization;
    const { login, user } = state;
    const { userId, refreshToken } = user;
    const { defaults, interceptors } = axios;
    const { headers } = defaults;

    defaults.baseURL = baseURL;

    for (let name in headers) {
      headers[name]["Content-Type"] = "application/json";
      headers[name]["Accept"] = "application/json";
    }

    if (login) {
      headers.common["Authorization"] = `Bearer ${state.user.token}`;
    }

    interceptors.response.use(undefined, (error) => {
      const { status, data } = error.response;
      if (status === 401) {
        userNewToken(userId, refreshToken).then(({ status, data }) => {
          if (status === 200) {
            dispatch(loginUser(data));
            sessionStorage.setItem("user", JSON.stringify(data));
          }
        });
      }
      if (status === 404) {
        console.log("yes");
        return Promise.reject(status);
      }
      return { status, data };
    });
  },
};
