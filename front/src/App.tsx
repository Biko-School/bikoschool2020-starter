import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import { AppContainer } from './views/components/AppContainer';
import * as Header from './views/components/Header';
import { MemesList } from './views/home/MemesList';
import { MemeDetailComponent } from './views/MemeDetail/MemeDetail';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';

function App() {
  const history =
    process.env.NODE_ENV === 'test'
      ? createMemoryHistory()
      : createBrowserHistory();
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header.HeaderCont>
          <Header.LogoContAndLink href="/">
            <Header.LogoIcon />
            <Header.LogoText>MEMEAFFINITY</Header.LogoText>
          </Header.LogoContAndLink>
        </Header.HeaderCont>
        <main>
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <MemesList />
              </Route>
              <Route path="/meme/:id">
                <MemeDetailComponent />
              </Route>
            </Switch>
          </Router>
        </main>
      </AppContainer>
    </>
  );
}

export default App;
