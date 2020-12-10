import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagono1, HexagonoPerfil, Perfil } from '../styles';

let userFoto ;
const jsonUserFoto = JSON.parse(localStorage.getItem('token'));
if (jsonUserFoto !== null) {
   userFoto = jsonUserFoto.usrCaminhoFoto;
}



 const HexaPerfil = ({history}) =>  {
    return (
        <HexagonoPerfil as={Link} to="/perfil">
          <Hexagono1>
            <Perfil foto={`"${userFoto}"`}/>
          </Hexagono1>
        </HexagonoPerfil>
    )
}

export default HexaPerfil;