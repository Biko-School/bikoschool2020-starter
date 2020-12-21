import React from 'react'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { Container } from './ui/views/Home/_components/Container'
import {
  Header,
  LogoWrapper,
  HeaderLogo,
  AppName,
} from './ui/views/Home/_components/Header'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home } from './ui/views/Home'
import { Detail } from './ui/views/Detail'
import { Login } from './ui/views/_components/Login/Login'
import { useAuth, User } from './domain/AuthContext'
import { Logout } from './ui/views/_components/Logout/Logout'

const App: React.FC = () => {
  const { isUserLogged, user, setLoggedUser, removeLoggedUser } = useAuth()

  const handleLogged = (loggedUser: User) => {
    setLoggedUser(loggedUser)
  }

  const handleLogout = () => {
    removeLoggedUser()
  }

  return (
    <>
      <Router>
        <GlobalStyles />
        <Container>
          <Header>
            <Link to={'/'}>
              <LogoWrapper>
                <HeaderLogo />
                <AppName>Guifaffinity</AppName>
              </LogoWrapper>
            </Link>

            {!isUserLogged() && <Login onLogged={handleLogged} />}

            {isUserLogged() && (
              <Logout loggedUser={user!} onLogout={handleLogout} />
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
