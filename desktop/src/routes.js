import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/login';
import Page404 from './pages/404'
import HomePage from './pages/home';

export default function Routes() {
    return (
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/home" exact component={HomePage}/>
    <Route path="/404" exact component={Page404} />
  </Switch>
    )
}
