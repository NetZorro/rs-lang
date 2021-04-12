import {getRandomInt, shuffleArray} from "./helpers";
import templatesURL from "./templatesURL";
import {IWord, IWordWithSuccess} from "./interfacesSavannah";
import {userWords} from "../../services/userWords";

export default class WordServices {
    static async getWordList(begin: number, end: number): Promise<IWord[]> {
        try {
            const page = getRandomInt(20);

            const res = await fetch(templatesURL.getWordListURL(page, 0));
            let data = await res.json();

            data = data.slice(begin, end);

            return data;
        } catch (err) {
            console.log('Error getWordList', err);
            return [];
        }
    }

    static async getWordListAPI(userId: string, group: string, p: string, optional: string): Promise<IWord[]> {
        try {
            const page = getRandomInt(20);

            const res = await userWords.getUserAggregatedWords(userId, group, p, optional);
            let data = await res.data[0].paginatedResults;

            return data.map((item: any) => ({
                ...item,
                id: item._id
            }));

        } catch (err) {
            console.log('Error getWordList', err);
            return [];
        }
    }

    static setFalseToSuccessField(wordArray: IWord[]): IWordWithSuccess[] {
        return  wordArray.map((item: IWord) => ({
            ...item,
            success: false
        }));
    }

    static getRoundWordsArray(wordWithSuccessArray: IWordWithSuccess[], wordInGame: IWordWithSuccess,   excludeIdx: number, count: number): IWordWithSuccess[] {
        let result = [];

        while (result.length < count) {
            const i = getRandomInt(wordWithSuccessArray.length - 1);

            if (i !== excludeIdx) {
                result.push(wordWithSuccessArray[i]);
            }
        }

        result.push(wordInGame);
        shuffleArray(result);

        return result;
    }

    static getCountError(wordArray: IWordWithSuccess[]): number {
        let cnt = 0;

        wordArray.forEach((item) => {
            if (!item.success) {
                cnt += 1;
            }
        });

        return cnt;
    }

    static getCountSuccess(wordArray: IWordWithSuccess[]): number {
        let cnt = 0;

        wordArray.forEach((item) => {
            if (item.success) {
                cnt += 1;
            }
        });

        return cnt;
    }
}
