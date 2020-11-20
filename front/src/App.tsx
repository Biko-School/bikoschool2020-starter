import React from 'react'
import { Container } from './views/_components/Container/Container'
import { Header } from './views/_components/Header/Header'
import { Switch, Route } from 'react-router-dom'
import { Home } from './views/Home/Home'
import { Details } from './views/Details/Details'

const App: React.FC = () => (
  <Container>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/meme/:id" component={Details} />
    </Switch>
  </Container>
)

export default App
