import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './pages/Formatacao.css'
import RoutesPrivate from './private'
import PageTeste from './pages/pageteste';
import { Tarefa, Cliente, Classificacao, Setor, HomePage, Login, PagePerfil, PageCadUsr, Sucesso } from './pages/pages'

export default function Routes() {
    return (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/cadastro/usuario" exact component={PageCadUsr}/>
    <Route path="/cadastro/usuario/sucesso" exact component={Sucesso}/>:
    <RoutesPrivate path="/home"  component={HomePage}/>
    <RoutesPrivate path="/perfil"  component={PagePerfil}/>
    <RoutesPrivate path="/tarefa"  component={Tarefa}/>
    <RoutesPrivate path="/cliente"  component={Cliente}/>
    <RoutesPrivate path="/setor"  component={Setor}/>
    <RoutesPrivate path="/classificacao"  component={Classificacao}/>
    <Route path="/teste" exact component={PageTeste}/>
    <Route path="/" component={() => <div className="center"><h1 className="h1-404">404 Página não encontrada</h1></div>} />
  </Switch>
    )
}
