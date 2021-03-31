import { baseURL } from "constants/baseURL";
import { ISettings } from "interfaces";

export const Settings = {
  getSettings: async (id: number): Promise<ISettings> => {
    let result;
    try {
      result = await fetch(`${baseURL}users/${id}/settings`);
    } catch (error) {
      result = error;
    }
    return (await result) ? result.json() : result;
  },
  putSettings: async (id: number, data: string) => {
    let result = await fetch(`${baseURL}`, {
      method: "PUT",
      body: data,
    });
    return await result.json();
  },
};
