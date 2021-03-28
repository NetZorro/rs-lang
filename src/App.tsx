import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { TextBook, Home, Units, Words, Settings } from "pages";
import { SideBar } from "components/SideBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="body">
      <Router>
        <div className="body__sidebar">
          <SideBar />
        </div>
        <div className="body__content">
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={Settings} path="/settings" />
            <Route exact component={TextBook} path="/textbook" />
            <Route
              exact
              component={Units}
              path="/textbook/category/:categoryId?"
            />
            <Route
              component={Words}
              path="/textbook/category/:categoryId/:unitId"
            />
            <Redirect from="/" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
