import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Configs from './pages/Configs';
import Game from './pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Configs } />
        <Route exact path="/game" component={ Game } />
      </Switch>

    </div>
  );
}
