// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './styling/reset.css';
import './styling/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
