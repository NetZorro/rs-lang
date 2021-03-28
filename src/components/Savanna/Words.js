import templatesURL from './templatesURL';
import { getRandomInt } from './helpers';

class Words {
  constructor(group) {
    this.group = group;
    this.currentWordArray = [];
  }

  async getWordList(begin, end) {
    try {
      const page = getRandomInt(20);

      const res = await fetch(templatesURL.getWordListURL(page, this.group));
      let data = await res.json();

      data = data.slice(begin, end);

      return data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error getWordList', err);
      return err;
    }
  }

  setFalseToSuccessField() {
    this.currentWordArray.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.success = false;
    });
  }

  async createWordArray(begin, end) {
    // todo: add random set word
    this.currentWordArray = await this.getWordList(begin, end);
    this.setFalseToSuccessField();
  }

  getWordById(id) {
    let wordObj = {};
    this.currentWordArray.forEach((item) => {
      if (item.id === id) {
        wordObj = item;
      }
    });

    return wordObj;
  }

  getWordByWord(word) {
    let wordObj = {};
    this.currentWordArray.forEach((item) => {
      if (item.word.toUpperCase() === word.toUpperCase()) {
        wordObj = item;
      }
    });

    return wordObj;
  }

  setWordSuccessById(id) {
    this.currentWordArray.forEach((item) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.success = true;
      }
    });
  }

  getCountError() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (!item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getCountSuccess() {
    let cnt = 0;

    this.currentWordArray.forEach((item) => {
      if (item.success) {
        cnt += 1;
      }
    });

    return cnt;
  }
}

export default Words;
