import axios from "axios";

import { baseURL } from "constants/baseURL";
import { authorization } from "services";


/**
 * Сервис для базовых настроек axios
 * И отлавливания 401 ошибки и записи нового токена
 * @param state 
 * @param dispatch 
 */
export const axiosService = (state: any, dispatch: any) => {
  const { userNewToken } = authorization;
  const {
    login,
    user: { userId, refreshToken },
  } = state;
  const { defaults, interceptors } = axios;
  const { headers } = defaults;
  defaults.baseURL = baseURL;
  for (let name in headers) {
    headers[name]["Content-Type"] = "application/json";
    headers[name]["Accept"] = "application/json";
  }
  if (login) {
    headers.common["Authorization"] = `Bearer ${state.user.token}`;
    interceptors.response.use(undefined, ({ response }) => {
      if (
        response.status === 401 ||
        response.data.message === "401 Unauthorized"
      ) {
        userNewToken(userId, refreshToken, dispatch);
      }
      return Promise.reject(response);
    });
  }
};
