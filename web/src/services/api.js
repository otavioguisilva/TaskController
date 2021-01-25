//import ApolloClient from 'apollo-boost';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink } from 'apollo-link-http';



const httpLink = new HttpLink({
    uri:'http://179.221.167.201:8081/graphql',
});
const wsLink = new WebSocketLink({
    uri: 'ws://179.221.167.201:8081/graphql',
    options: {
      reconnect: true,
    },
  });


const link = split(
    ({ query }) => {
      const  definition  = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
    );

export default new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
