import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { TextBook, Home, Units, Words, Settings, Statistics } from "pages";
import { SideBar } from "components/SideBar";
import "./App.css";
import { Games } from "pages/Games/Games";

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
            <Route exact component={Statistics} path="/statistics" />
            <Route exact component={Games} path="/games" />
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
    </div>
  );
};

export default App;
