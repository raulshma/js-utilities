import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Help from './pages/Help';

import Navbar from './components/Navbar';

import LengthCalculator from './components/string/LengthCalculator';
import SubString from './components/string/SubString';
import SFormat from './components/string/Formatter';
import Replacer from './components/string/Replacer';
import Conversion from './components/string/Conversion';
import SToArray from './components/string/SToArray';

import DTConversions from './components/datetime/DTConversions';
import TypingGame from './pages/TypingGame';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/Help" component={Help} />
        <Route path="/Typing" component={TypingGame} />
        {/* String Routes */}
        <Route path="/slength" component={LengthCalculator} />
        <Route path="/sstring" component={SubString} />
        <Route path="/sformater" component={SFormat} />
        <Route path="/sreplacer" component={Replacer} />
        <Route path="/sconversion" component={Conversion} />
        <Route path="/sstoarray" component={SToArray} />
        {/* DateTime Routes */}
        <Route path="/dtconversion" component={DTConversions} />
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
