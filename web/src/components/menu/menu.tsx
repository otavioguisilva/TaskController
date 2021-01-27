import React from 'react';
import { Clientes, Tarefa, Setor, Classificacao, MenuNav, MenuCima, MenuBaixo} from './styles'
import Hexa from './components/hexagono';
import HexaPerfil from './components/hexagonoPerfil'

const Menu:React.FC = () =>  {
    return (
      <MenuNav>
        <HexaPerfil/>
        <MenuCima>
          <Hexa to="/cliente">
           <Clientes/>
          </Hexa>
          <Hexa to="/setor">
            <Setor/>
          </Hexa>
        </MenuCima>
        <MenuBaixo>
          <Hexa to = "/tarefa">
            <Tarefa/>
          </Hexa>
          <Hexa to="/classificacao">
            <Classificacao/>
          </Hexa>
        </MenuBaixo>
      </MenuNav>
    );
  }
  
  export default Menu;