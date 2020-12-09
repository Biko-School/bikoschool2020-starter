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

const App: React.FC = () => {
  const [auth, setAuth] = useState<Auth>({ logged_in: false })

  const handleLogin = (auth: Auth) => {
    setAuth(auth)

    localStorage.setItem('auth', JSON.stringify(auth))
  }

  const handleLogout = () => {
    setAuth({ logged_in: false })
    localStorage.removeItem('auth')
  }

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      setAuth(JSON.parse(auth))
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

            {auth?.logged_in && (
              <Logout auth={auth} onHandleLogout={handleLogout} />
            )}

            {!auth?.logged_in && <Login onHandleLogin={handleLogin} />}
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

interface props {
  onHandleLogout(): void
  auth: Auth
}

const Logout: React.FC<props> = ({ auth, onHandleLogout }) => {
  return (
    <>
      <img src={auth.user?.avatar_url} alt={auth.user?.user_name} />
      <span>{auth.user?.display_name}</span>
      <button aria-label="Desloguearse" onClick={onHandleLogout}>
        Desloguearse
      </button>
    </>
  )
}

export default App
