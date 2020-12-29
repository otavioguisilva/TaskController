import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import api from './services/api';
import Routes from './routes';
import StoreProvider from './components/Store/provider'

function App() {
  return (
    <ApolloProvider client={api}>
      <Router>
        <StoreProvider>
          <Routes />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
