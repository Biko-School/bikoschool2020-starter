import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'

if (process.env.REACT_APP_MOCK) {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
