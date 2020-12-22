import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagono1, HexagonoPerfil, Perfil } from '../styles';

let userFoto ;
const usrCaminhoFoto = localStorage.getItem('usrCaminhoFoto');
if (usrCaminhoFoto !== null) {
   userFoto = usrCaminhoFoto;
}



 const HexaPerfil = ({history}) =>  {
    return (
        <HexagonoPerfil as={Link} to="/perfil">
          <Hexagono1>
            <Perfil as="img" src={userFoto}/>
          </Hexagono1>
        </HexagonoPerfil>
    )
}

export default HexaPerfil;