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

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { axiosSettings } = authorization;

  axiosSettings(state, dispatch);

  const PrivateRoute = ({
    children,
    ...rest
  }: {
    children: any;
    path: string;
    exact: boolean;
  }) => {
    let auth = state.login;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/authorization",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

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
              {/*FIXME: Not Working <Route exact component={DictionaryPage} path="/dictionary" /> */}

              <Route exact component={Games} path="/games" />
              <Route exact component={AudioCallGame} path="/games/audiocall" />
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
              {/* <PrivateRoute exact path="/dictionary" > */}
              {/* <DictionaryPage /> */}
              {/* </PrivateRoute> */}

              <Route exact component={DictionaryPage} path="/dictionary" />
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
              <Redirect from="/" to="/" />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
};
