import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Router = ({ routes }) => (
  <Switch>
    {routes.map((i, index) => <Route path={i.path} component={i.component} key={index} exact={i.exact ? true : false} /> )}
  </Switch>
);

export default Router;