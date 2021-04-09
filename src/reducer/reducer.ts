import React from "react";

import { userAuth, userAuthObj, removeUserSessionStorage } from "utils/lib";
import { serviceSettings } from "services";

export const Context = React.createContext({ state: {}, dispatch: {} } as any);

/**
 * Начальный стейт
 */
export const initialState: any = {
  settings: {
    translateWord: false,
    translateTextMeaning: false,
    translateTextExample: false,
    showBtnGroups: false,
  },
  words: [],
  user: userAuthObj(),
  login: userAuth(),
};

const { setSettings } = serviceSettings;

/**
 * Чистая функция, которая принимает предыдущее состояние и экшен (state и action) 
 * и возвращает следующее состояние (новую версию предыдущего).
 * @param state
 * @param action
 */
export const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "settings__update":
      return {
        ...state,
        ...action.payload,
      };
    case "settings__update-login":
      setSettings(state.user.userId, action.payload.settings);
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
        login: true,
      };
    case "user__logOut":
      removeUserSessionStorage();
      return {
        ...state,
        login: false,
        user: {},
        settings: {
          translateWord: false,
          translateTextMeaning: false,
          translateTextExample: false,
          showBtnGroups: false,
        },
      };
    default:
      return state;
  }
};
