import { useContext } from "react";

import { Context } from "reducer";
import { settingsText } from "constants/data";
import { serviceSettings } from "services";
import "./settings.css";

export const Settings: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { login, user, settings } = state;
  const nameObjProperties: string[] = Object.keys(settings);
  if (login) {
    serviceSettings.getSettings(user.userId, user.token);
  }
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
          <div key={index}>
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
