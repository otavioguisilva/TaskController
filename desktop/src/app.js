import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import api from './services/api'
import Routes from './routes'
//import 'file:///src/components/login/Formatacao.css'

const App = () => {
    return (
        <ApolloProvider client={api}>
            <HashRouter 
            initialEntries={["/"]}
            >
               <Routes /> 
            </HashRouter>
        </ApolloProvider>
    )
}

export default App