import { Route, Switch } from 'react-router';
import React from 'react';

import Home from '../components/Home';
import Room from '../components/Room';

const Router = props => (
  <Switch>
    <Route path="/:room" component={Room} />
    <Route path="/" exact component={Home} />
  </Switch>
);

export default Router;
