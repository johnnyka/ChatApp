// eslint-disable-next-line
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/chatroom'>
          <ChatPage />
        </Route>
        <Route path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
