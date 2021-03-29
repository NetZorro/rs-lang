import { useContext } from "react";

import { Context } from "reducers";
import { settingsText } from "constants/data";
import "./settings.css";

export const Settings: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { settings } = state;
  const nameObjProperties: string[] = Object.keys(settings);
  const dispatchId = (id: number) => {
    dispatch({
      type: "settings__update",
      payload: {
        ...state,
        settings: {
          ...settings,
          [nameObjProperties[id]]: !settings[nameObjProperties[id]],
        },
      },
    });
  };
  return (
    <div>
      <h1 className="settings__title">Settings</h1>
      {settingsText.map((item, index) => {
        return (
          <div>
            <label className="settings__label">
              {item}
              <input
                onChange={() => dispatchId(index)}
                defaultChecked={settings[nameObjProperties[index]]}
                type="checkbox"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
