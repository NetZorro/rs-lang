import { baseURL } from "constants/baseURL";
/**
 * Сервис для работы со словами
 */
interface IWord {
  id: string;
}
export const wordsService = {
  getWords: async function (id: number): Promise<IWord[]> {
    let result = await fetch(`${baseURL}words/1`);
    return await result.json();
  },
};
