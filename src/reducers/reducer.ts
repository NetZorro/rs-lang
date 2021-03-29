import React from "react";

export const Context = React.createContext({ state: {}, dispatch: {} } as any);

export const initialState: any = {
  settings: {
    translateWord: true,
    translateTextMeaning: true,
    translateTextExample: true,
    showBtnGroups: true,
  },
  words : [],
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
    case "add__words":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
