import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/login';
import Page404 from './components/404'

export default function Routes() {
    return (
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/404" component={Page404} />
  </Switch>
    )
}
