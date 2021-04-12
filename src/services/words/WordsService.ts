import axios from "axios";

import { baseURL } from "constants/baseURL";
import { IWord } from "Entities";

/**
 * Получения слов с api .
 * Группой по 20 и по id
 */
export const wordsService = {
  getWords(
    category: string,
    unit: string
  ): Promise<{ status: number; data: IWord[] }> {
    return axios.get(`words?group=${category}&page=${unit}`);
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
