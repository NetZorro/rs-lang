import { baseURL } from "constants/baseURL";

export const serviceSettings = {
  async getSettings(
    id: number,
    token: string,
    dispatch: any
  ): Promise<boolean> {
    let result = await fetch(`${baseURL}users/${id}/settings`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { status } = result;
    if (status === 200) {
      let reply = await result.json();
      dispatch(dispatchUserSettings(reply));
      return true;
    }
    return false;
  },
  async putSettings(id: number, token: string, data: string): Promise<void> {
    await fetch(`${baseURL}users/${id}/settings`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: convertJSONSettings(data),
    });
  },
};

const convertJSONSettings = (data: any) => {
  return JSON.stringify({ optional: data });
};
const dispatchUserSettings = (data: any) => {
  return { type: "settings__update", payload: { settings: data.optional } };
};
