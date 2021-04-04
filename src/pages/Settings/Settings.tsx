import { useContext, useEffect } from "react";

import { Context } from "reducer";
import { settingsText } from "constants/data";
import { serviceSettings } from "services";
import "./settings.css";

export const Settings: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const { login, user, settings } = state;
  const { getSettings, putSettings } = serviceSettings;
  const nameObjProperties: string[] = Object.keys(settings);
  useEffect(() => {
    if (login) {
      getSettings(user.userId, user.token, dispatch);
    }
  }, []);
  const dispatchSettingStatus = (nameProperty: string) => {
    return dispatch({
      type: "settings__update",
      payload: {
        settings: {
          ...settings,
          [nameProperty]: !settings[nameProperty],
        },
      },
    });
  };
  useEffect(() => {
    if (login) {
      putSettings(user.userId, user.token, settings);
    }
  }, [dispatchSettingStatus]);
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
