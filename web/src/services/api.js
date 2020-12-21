//import ApolloClient from 'apollo-boost';
import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
    uri: 'http://localhost:8081/graphql' ,
    cache: new InMemoryCache()
     
});