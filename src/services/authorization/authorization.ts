import axios from "axios";

import { IUserReg, IUserAuth } from "Entities/IAuthorization";
import { baseURL } from "constants/baseURL";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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

  requestCancel() {
    source.cancel();
  },

  axiosSettings(state: any, dispatch: any) {
    const { login } = state;
    const { defaults } = axios;
    const { headers } = defaults;

    defaults.baseURL = baseURL;
    for (let name in headers) {
      headers[name]["Content-Type"] = "application/json";
      headers[name]["Accept"] = "application/json";
    }

    if (login) {
      headers.common["Authorization"] = `Bearer ${state.user.token}`;
    }
  },
};

axios.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 417) {
    return Promise.resolve(error.response);
  }

  return Promise.reject(error);
});
