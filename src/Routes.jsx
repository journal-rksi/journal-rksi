import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import SheetPage from 'pages/SheetPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/sheet" component={SheetPage} />
  </Switch>
);

export default Routes;
