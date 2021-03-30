import { baseURL } from "constants/baseURL";

export const Settings = {
  getSettings: async (id: number) => {
    try {
      let result = await fetch(`${baseURL}users/${id}/settings`);
      return result.json();
    } catch (error) {
      console.log('Settings Error', error)
    }
  },
  putSettings: async (id: number, data: string) => {
    let result = await fetch(`${baseURL}`, {
      method: "PUT",
      body: data,
    });
    return await result.json();
  },
};
