import { baseURL } from "constants/baseURL";
import { IWord } from "interfaces";

/**
 * Получения слов с api .
 * Группой по 20 и по id
 */
export const wordsService = {
  getWords: async (category: string, unit: string): Promise<IWord[]> => {
    let result;
    try {
      result = await fetch(`${baseURL}words?group=${category}&page=${unit}`);
    } catch (error) {
      result = error;
    }
    return (await result) ? result.json() : result;
  },
  getWordById: async (id: string): Promise<IWord> => {
    let result;
    try {
      result = await fetch(`${baseURL}words/${id}`);
    } catch (error) {
      result = error;
    }
    return (await result) ? result.json() : result;
  },
};
