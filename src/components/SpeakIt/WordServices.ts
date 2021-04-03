import {getRandomInt, shuffleArray} from "./helpers";
import templatesURL from "./templatesURL";
import {IWord, IWordWithSuccess} from "./interfacesSpeakit";

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

    static setFalseToSuccessField(wordArray: IWord[]): IWordWithSuccess[] {
        return  wordArray.map((item: IWord) => ({
            ...item,
            success: false
        }));
    }

    static getRoundWordsArray(wordWithSuccessArray: IWordWithSuccess[], count: number): IWordWithSuccess[] {
        let result = [];
        let arr: number[] = [];

        while (result.length < count) {
            const i = getRandomInt(wordWithSuccessArray.length - 1);

            if (arr.indexOf(i) === -1) {
                result.push(wordWithSuccessArray[i]);

                arr.push(i);
            }
        }

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
