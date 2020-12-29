//import ApolloClient from 'apollo-boost';
import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
    uri: 'http://179.221.167.201:8081/graphql' ,
    cache: new InMemoryCache()
     
});