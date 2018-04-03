import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import DonatePage from "./components/pages/DonatePage";

const App = () => (
<div>
  <Route path="/" exact component={HomePage} />
  <Route path="/donate" exact component={DonatePage} />
</div>
);

export default App;
