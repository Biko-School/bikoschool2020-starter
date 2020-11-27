import React from 'react';
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'
import { Home } from './views/home/home';
import { Container } from './views/_components/Container';
import { Header } from './views/_components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MemeDetail } from './views/memeDetail/MemeDetail';

const App: React.FC=() => {
  return (
      
        <Container>
          <GlobalStyles />
          <Header/>
          <Router>
            <Switch>
              <Route path="/meme-detail/:id" children={<MemeDetail />} />
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>

        </Container>
  );
}

export default App;
