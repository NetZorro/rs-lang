import { useReducer } from "react";
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
  DictionaryPage,
  AuthorizationPage,
} from "pages";
import { SideBar } from "components/SideBar";
import "./App.css";
import { initialState, reducer, Context } from "reducer";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

export default App;
