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
import { GlobalContainer } from "./views/_components/Container/Container";
import { Header, LogoWrapper } from "./views/_components/Header/Header";

export default function App() {
  return (
    <GlobalContainer>
        <Header>
          <LogoWrapper/>GUIFAFFINITY
        </Header>
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
            </Switch>
        </Router>
    </GlobalContainer>
  );
}

