import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import { AppContainer } from './views/components/AppContainer';
import * as Header from './views/components/Header';
import { MemesList } from './views/home/MemesList';
import { MemeDetailComponent } from './views/MemeDetail/MemeDetail';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
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
          <Router>
            <Switch>
              <Route path="/meme/:id">
                <MemeDetailComponent />
              </Route>
              <Route path="/">
                <MemesList />
              </Route>
            </Switch>
          </Router>
        </main>
      </AppContainer>
    </>
  );
}

export default App;
