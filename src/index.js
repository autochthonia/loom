import './index.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import CombatantList from './components/CombatantList';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cja6cc8ww08ny0119esj7ljec' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <CombatantList />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
