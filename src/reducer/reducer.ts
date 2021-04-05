import React from "react";

import { userAuth, userAuthObj, removeUserSessionStorage } from "utils/lib";

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
  user: userAuthObj(),
  login: userAuth(),
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
        user: action.payload,
      };
    case "user__logIn":
      return {
        ...state,
        login: true,
      };
    case "user__logOut":
      removeUserSessionStorage();
      return {
        ...state,
        login: false,
        user: {},
      };
    default:
      return state;
  }
};
