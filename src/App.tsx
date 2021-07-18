import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Help from './pages/Help';

import Navbar from './components/Navbar';
import SLength from './components/string/SLength';
import SubString from './components/string/SubString';
import SFormat from './components/string/SFormat';
import Replacer from './components/string/Replacer';
import Conversion from './components/string/Conversion';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/help" component={Help} />
        <Route path="/home" component={Home} />
        <Route path="/slength" component={SLength} />
        <Route path="/sstring" component={SubString} />
        <Route path="/sformater" component={SFormat} />
        <Route path="/sreplacer" component={Replacer} />
        <Route path="/sconversion" component={Conversion} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
