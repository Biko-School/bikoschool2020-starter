import React from 'react'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { Container } from './ui/views/Home/_components/Container'
import {
  Header,
  LogoWrapper,
  HeaderLogo,
  AppName,
} from './ui/views/Home/_components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './ui/views/Home'
import { Detail } from './ui/views/Detail'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Container>
          <Header>
            <LogoWrapper>
              <HeaderLogo />
              <AppName>Guifaffinity</AppName>
            </LogoWrapper>
          </Header>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/memes/:id">
              <Detail />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default App
