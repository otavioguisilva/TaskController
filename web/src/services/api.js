//import ApolloClient from 'apollo-boost';
import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
    uri: 'http://192.168.0.27:8081/graphql' ,
    cache: new InMemoryCache()
     
});