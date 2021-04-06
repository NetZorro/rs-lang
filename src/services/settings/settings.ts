import axios from "axios";

export const serviceSettings = {
  getSettings(id: string, dispatch: any): Promise<void> {
    return axios.get(`users/${id}/settings`).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        dispatch(dispatchUserSettings(data.optional));
      }
    });
  },
  putSettings(id: string, data: object): Promise<void> {
    return axios.put(
      `users/${id}/settings`,
      JSON.stringify({ optional: data })
    )
  },
};
const dispatchUserSettings = (data: any) => {
  return { type: "settings__update", payload: { settings: data } };
};
