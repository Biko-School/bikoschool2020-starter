import React from 'react'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { GeneralWrapper } from './ui/components/GeneralWrapper'
import Home from './ui/views/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MemeDetail } from './ui/views/MemeDetail'
import Header from './ui/components/Header/Header'
const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <GeneralWrapper>
        <Header />
        <Router>
          <Switch>
            <Route path="/meme-detail/:id" children={<MemeDetail />} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </GeneralWrapper>
    </>
  )
}

export default App
