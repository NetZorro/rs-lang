import React from "react";

export const Context = React.createContext({ state: {}, dispatch: {} } as any);

export const initialState: any = {
  settings: {
    translateWord: false,
    translateTextMeaning: false,
    translateTextExample: false,
    showBtnGroups: false,
  },
  words: [],
  dictionary: { deleted: [], difficult: [], study: [] },
  user: {},
  login: false,
};

export const reducer = (
  state: object,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case "settings__update":
      return {
        ...state,
        ...action.payload,
      };
    case "words__add":
      return {
        ...state,
        ...action.payload,
      };
    case "user__authorization":
      return {
        ...state,
        ...action.payload,
      };
    case "user__loginIn":
      return {
        ...state,
        login: true,
      };
    default:
      return state;
  }
};
