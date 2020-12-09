import React, { useEffect, useState } from 'react'
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
import { Auth, AuthContext } from './domain/AuthContext'
import Cookies from 'js-cookie'

const App: React.FC = () => {
  const [auth, setAuth] = useState<Auth>({ logged_in: 'false' })

  const handleLogin = (auth: Auth) => {
    setAuth(auth)
    Cookies.set('Guiffy-cookie', auth)
  }

  useEffect(() => {
    const cookie = Cookies.get('Guiffy-cookie')
    if (cookie) {
      setAuth(JSON.parse(cookie))
    }
  }, [])

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

            {auth?.logged_in === 'true' && (
              <>
                <span>{auth.user?.display_name}</span>
                <button aria-label="Desloguearse">Desloguearse</button>
              </>
            )}

            {auth?.logged_in === 'false' && (
              <Login onHandleLogin={handleLogin} />
            )}
          </Header>

          <Switch>
            <AuthContext.Provider value={{ auth }}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/memes/:id">
                <Detail />
              </Route>
            </AuthContext.Provider>
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default App
