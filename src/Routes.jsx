import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import HomePage from 'pages/private/HomePage';
import SheetPage from 'pages/private/SheetPage';
import LoginPage from 'pages/public/LoginPage';

import useUser from 'hooks/useUser';

const Routes = () => {
  const { me } = useUser();

  useEffect(() => me(), []);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/sheet" component={SheetPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  );
};

export default Routes;
