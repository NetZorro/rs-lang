import React, { useReducer } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import {
  TextBook,
  Home,
  Units,
  Words,
  Settings,
  Statistics,
  Games,
  AuthorizationPage,
  DictionaryPage,
  Team,
} from "pages";
import { SideBar } from "components/SideBar";
import { authorization } from "services";
import { initialState, reducer, Context } from "reducer";
import { AudioCallGame } from "./pages/Games/AudioCallGame/AudioCallGame";
import "./App.css";

import SavannahPage from "components/Savanna/SavannahPage";
import SpeakitPage from "components/SpeakIt/SpeakitPage";
import SprintPage from "components/Sprint/SprintPage";

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { axiosSettings } = authorization;

  axiosSettings(state, dispatch);

  return (
    <div className="body">
      <Context.Provider value={{ state, dispatch }}>
        <Router>
          <div className="body__sidebar">
            <SideBar />
          </div>
          <div className="body__content">
            <Switch>
              <Route exact component={Home} path="/" />
              <Route exact component={Settings} path="/settings" />
              <Route exact component={TextBook} path="/textbook" />
              <Route exact component={Statistics} path="/statistics" />
              <Route exact component={Team} path="/team" />

              <Route exact component={Games} path="/games" />
              <Route
                exact
                component={SavannahPage}
                path="/games/savannah/:source?/:group?/:page?"
              />
              <Route
                exact
                component={SprintPage}
                path="/games/sprint/:source?/:group?/:page?"
              />
              <Route
                exact
                component={SpeakitPage}
                path="/games/speakit/:source?/:group?/:page?"
              />
              <Route
                exact
                component={AudioCallGame}
                path="/games/audiocall/:source?/:group?/:page?"
              />

              <Route
                exact
                component={AuthorizationPage}
                path="/authorization"
              />
              <Route
                exact
                component={Units}
                path="/textbook/category-:optional-:categoryId/"
              />
              <Route
                exact
                component={Words}
                path="/textbook/category-:optional-:categoryId/unit-:unitId"
              />
              <Route
                exact
                render={() =>
                  state.login ? (
                    <DictionaryPage />
                  ) : (
                    <Redirect to="/authorization" />
                  )
                }
                path="/dictionary"
              />
              {state.login && (
                <>
                  <Route
                    exact
                    component={Units}
                    path="/dictionary/category-:optional-:categoryId/"
                  />
                  <Route
                    exact
                    component={Words}
                    path="/dictionary/category-:optional-:categoryId/unit-:unitId"
                  />
                </>
              )}
              <Redirect from="/" to="/" />
            </Switch>
            <footer className="footer">
              <div className="app__github">
                <a
                  href="https://github.com/NetZorro"
                  className="app__github-link"
                ></a>
              </div>
              <div className="app__github">
                <a
                  href="https://github.com/KarpusKonstantin"
                  className="app__github-link"
                ></a>
              </div>
              <div className="app__github">
                <a
                  href="https://github.com/SashaSadovskaya"
                  className="app__github-link"
                ></a>
              </div>
              <div className="app__github">
                <a
                  href="https://github.com/Rodion-git"
                  className="app__github-link"
                ></a>
              </div>
              <div className="app__block">
                <a href="https://rs.school/react/" className="app__github-link"></a>
              </div>
            </footer>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
};
