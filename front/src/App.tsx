import React, { useState } from 'react'
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
import { Login } from './ui/views/_components/Login/Login'
import { User } from './domain/models/User'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (user: User) => {
    setUser(user)
    setLoggedIn(true)
  }
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
            {loggedIn ? (
              <>
                <span>{user?.display_name}</span>
                <button aria-label="Desloguearse">Desloguearse</button>
              </>
            ) : (
              <Login onHandleLogin={handleLogin} />
            )}
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
