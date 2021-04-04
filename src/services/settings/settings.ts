import { baseURL } from "constants/baseURL";
import { ISettings } from "interfaces";

export const serviceSettings = {
  getSettings: async (id: number, token: string): Promise<ISettings> => {
    let result;
    try {
      result = await fetch(`${baseURL}users/${id}/settings`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(authTokenBody(token)),
      });
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

const authTokenBody = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};
