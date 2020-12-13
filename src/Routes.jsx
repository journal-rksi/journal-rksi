import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import HomePage from 'pages/private/HomePage';
import SheetPage from 'pages/public/SheetPage';
import LoginPage from 'pages/public/LoginPage';

import useUser from 'hooks/useUser';

const Routes = () => {
  const { authorize } = useUser();

  useEffect(() => authorize(), []);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/sheet" component={SheetPage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  );
};

export default Routes;
