import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageCadUsr from './components/pages/cadastros/usuario/usuario';
import Sucesso from './components/pages/cadastros/usuario/sucesso';
import Login from './components/pages/login';
import HomePage from './components/pages/home';
import './components/pages/Formatacao.css'
import RoutesPrivate from './private'
import  PagePerfil  from './components/pages/perfil';

export default function Routes() {
    return (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/cadastro/usuario" exact component={PageCadUsr}/>
    <Route path="/cadastro/usuario/sucesso" exact component={Sucesso}/>:
    <RoutesPrivate path="/home"  component={HomePage}/>
    <RoutesPrivate path="/perfil"  component={PagePerfil}/>
    <Route path="/" component={() => <div className="center"><h1 className="h1-404">404 Página não encontrada</h1></div>} />
  </Switch>
    )
}
