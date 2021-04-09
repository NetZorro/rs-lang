import axios from "axios";

export const userWords = {
  getAllUserWords(userId: string) {
    axios.get(`users/${userId}/words`);
  },

  async addUserWords(
    userId: string,
    wordId: string,
    difficulty: boolean,
    deleted: boolean
  ) {
    const body = addWordsBodyObj(difficulty, deleted);
    // TODO: Подумать над этим сервисом
    return axios
      .post(`users/${userId}/words/${wordId}`, body)
      .then(({ status, data }) => {
        if (status === 417) {
          userWords.setUserWords(userId, wordId, body);
        }
      });
  },

  setUserWords(userId: string, wordId: string, body: any) {
    return axios.put(`/users/${userId}/words/${wordId}`, body);
  },

  getUserAggregatedWords(
    userId: string,
    group: string,
    page: string,
    deleted: true | null
  ) {
    const filter = filterMongo(group, page, deleted);
    return axios.get(
      `users/${userId}/aggregatedWords?wordsPerPage=20&filter=${filter}`
    );
  },
};

export const filterMongo = (
  group: string,
  page: string,
  deleted: true | null
) => {
  return encodeURIComponent(
    `{"$and" : [{"group":${Number(group)} , "page" : ${Number(
      page
    )},"userWord.optional.delete" : ${deleted}}]}`
  );
};

export const addWordsBodyObj = (difficulty: boolean, deleted: boolean) => {
  if (difficulty) {
    return { difficulty: "hard" };
  } else if (deleted) {
    return { optional: { delete: true } };
  }
};
