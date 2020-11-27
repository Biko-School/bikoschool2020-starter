import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import App from './App'
import MemeDetail from './MemeDetail'

const Routes: React.FC = () => {
  const getMemeIdFromUrl = (props: RouteComponentProps): string => {
    let match = props.match.params as any
    return match.id
  }

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" render={() => <App />} />
      <Route
        path="/detail/:id"
        render={(props) => <MemeDetail idMeme={getMemeIdFromUrl(props)} />}
      />
    </Switch>
  )
}

export default Routes
