import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.REACT_APP_MSW === 'true') {
  const { worker } = require('./tests/mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
