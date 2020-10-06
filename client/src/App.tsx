// eslint-disable-next-line
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import ChatInfoPage from './pages/ChatInfoPage';

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/chatroom'>
            <ChatPage />
          </Route>
          <Route path='/chatinfo'>
            <ChatInfoPage />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
