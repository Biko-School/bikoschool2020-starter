import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import MemeDetail from "./MemeDetail";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/detail">
            <MemeDetail />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
to: string
        </Switch>
    </Router>
  );
}

