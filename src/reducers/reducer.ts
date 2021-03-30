import React from "react";

export const Context = React.createContext({ state: {}, dispatch: {} } as any);

export const initialState: any = {
  settings: {
    translateWord: true,
    translateTextMeaning: true,
    translateTextExample: true,
    showBtnGroups: true,
  },
  words: [],
  dictionary: { deleted: [], difficult: [], study: [] },
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
    default:
      return state;
  }
};
