import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Help from './pages/Help';
import SLength from './components/string/SLength';
import SubString from './components/string/SubString';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/help" component={Help} />
        <Route path="/home" component={Home} />
        <Route path="/slength" component={SLength} />
        <Route path="/sstring" component={SubString} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
