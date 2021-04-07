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
} from "pages";
import { SideBar } from "components/SideBar";
import { axiosService } from "services";
import { initialState, reducer, Context } from "reducer";
import "./App.css";

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  axiosService(state, dispatch);

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
              <Route exact component={DictionaryPage} path="/dictionary" />
              <Route exact component={Games} path="/games" />
              <Route
                exact
                component={AuthorizationPage}
                path="/authorization"
              />
              <Route
                exact
                component={Units}
                path="/textbook/category-:categoryId/"
              />
              <Route
                component={Words}
                path="/textbook/category-:categoryId/unit-:unitId"
              />
              <Redirect from="/" to="/" />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
};
