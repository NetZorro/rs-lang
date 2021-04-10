import axios from "axios";

type response = {
  status: number;
  data: string | any;
};

export const serviceSettings = {
  getSettings(id: string): Promise<response> {
    return axios.get(`users/${id}/settings`);
  },
  setSettings(id: string, data: object): Promise<response> {
    return axios.put(
      `users/${id}/settings`,
      JSON.stringify({ optional: data })
    );
  },
};

