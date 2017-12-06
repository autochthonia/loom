import { Route, Switch } from 'react-router';
import React from 'react';

import Home from '../components/Home';
import Room from '../components/Room';
import Sheet from '../components/pages/Sheet';
import Test from '../components/Test';

const Router = props => (
  <Switch>
    <Route path="/test" exact component={Test} />
    <Route path="/s/:sheet" exact component={Sheet} />
    <Route path="/:room" component={Room} />
    <Route path="/" exact component={Home} />
  </Switch>
);

export default Router;
