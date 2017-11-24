import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { BrowserRouter as Router } from 'react-router-dom';
import { WebSocketLink } from 'apollo-link-ws';
import { injectGlobal } from 'styled-components';
import { split } from 'apollo-client-preset';
import React from 'react';
import ReactDOM from 'react-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const serviceId = 'cja6cc8ww08ny0119esj7ljec';

const httpLink = new BatchHttpLink({
  uri: `https://api.graph.cool/simple/v1/${serviceId}`,
  batchInterval: 1000,
});

// const middlewareAuthLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem(GC_AUTH_TOKEN);
//   const authorizationHeader = token ? `Bearer ${token}` : null;
//   operation.setContext({
//     headers: {
//       authorization: authorizationHeader,
//     },
//   });
//   return forward(operation);
// });

// const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/${serviceId}`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: localStorage.getItem(GC_AUTH_TOKEN),
    // },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
  // httpLinkWithAuthToken,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

injectGlobal`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
