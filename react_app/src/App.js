import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import DonatePage from "./components/pages/DonatePage";
import SuccessPage from "./components/pages/SuccessPage";

const App = () => (
<div className="ui container">
  <Route path="/" exact component={HomePage} />
  <Route path="/donate" exact component={DonatePage} />
  <Route path="/success" exact component={SuccessPage} />
</div>
);

export default App;
