import { baseURL } from "constants/baseURL";
import { IWord } from "interfaces";

/**
 * Сервис для работы со словами
 */
export const wordsService = {
  getWords: async function (category: string, unit: string): Promise<IWord[]> {
    try {
      let result = await fetch(
        `${baseURL}words?group=${category}&page=${unit}`
      );
      return await result.json();
    } catch (error) {
      console.log("Error get Words :", error);
      return error;
    }
  },
  getWordById: async (id: string) => {
    try {
      let result = await fetch(`${baseURL}words/${id}`);
      return await result.json();
    } catch (error) {
      console.log("Error get Word by id", error);
      return error;
    }
  },
};
