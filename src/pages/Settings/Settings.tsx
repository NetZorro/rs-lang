import { useContext, useLayoutEffect } from "react";

import { Context } from "reducer";
import { settingsText } from "constants/data";
import { serviceSettings } from "services";
import "./settings.css";

export const Settings: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const {
    login,
    user: { userId },
    settings,
  } = state;
  const { getSettings } = serviceSettings;
  const nameObjProperties: string[] = Object.keys(settings);
  useLayoutEffect(() => {
    if (login) {
      getSettings(userId, dispatch);
    }
  }, []);
  const dispatchSettingStatus = (nameProperty: string) => {
    let result = {
      type: login ? "settings__update-login" : "settings__update",
      payload: {
        settings: {
          ...settings,
          [nameProperty]: !settings[nameProperty],
        },
      },
    };
    dispatch(result);
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
                onChange={() => dispatchSettingStatus(nameObjProperties[index])}
                checked={settings[nameObjProperties[index]]}
                type="checkbox"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
