import axios from "axios";

export const userWords = {
  getAllUserWords(userId: string) {
    axios.get(`users/${userId}/words`);
  },

  async addUserWords(
    userId: string,
    wordId: string,
    optional: string,
    arrWinLos?: [number, number]
  ) {
    const filter = switchOptionalSetWord(optional, arrWinLos);
    return axios
      .post(`users/${userId}/words/${wordId}`, filter)
      .then(({ status, data }) => {
        if (status === 417) {
          userWords.setUserWords(userId, wordId, filter);
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
      optional: string
  ) {
    const filter = switchOptional(+group, +page, optional);
    return axios.get(
      `users/${userId}/aggregatedWords?wordsPerPage=20&filter=${filter}`
    );
  },

  getUserStudyWords(userId: string): any {
    const filter = encodeURIComponent('{ "userWord.optional.study": true }');
    return axios.get(
      `users/${userId}/aggregatedWords?wordsPerPage=3600&filter=${filter}`
    );
  },
};

const switchOptional = (group: number, page: number, optional: string) => {
  switch (optional) {
    case "textbook":
      return encodeURIComponent(
        `{"$and" : [{"group":${group} , "page" : ${page},"$or" : [{"userWord.optional.delete" : null}, {"userWord.optional.delete" : false}]}
      ]}`
      );
    case "difficult":
      return encodeURIComponent(
        `{"$and" : [{"group":${group} , "page" : ${page},"$or" : [{"userWord.optional.delete" : null}, {"userWord.optional.delete" : false}], "userWord.difficulty": "hard"}]}`
      );
    case "deleted":
      return encodeURIComponent(
        `{"$and" : [{"group":${group} , "page" : ${page},"userWord.optional.delete" : true}]}`
      );
  }
};

const switchOptionalSetWord = (optional: string, count?: any) => {
  switch (optional) {
    case "difficulty":
      return { difficulty: "hard", optional: { study: true } };
    case "deleted":
      return { optional: { delete: true } };
    case "games":
      return { optional: { study: true, won: count.won, lost: count.lost } };
  }
};
