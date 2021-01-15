import React from 'react';
import Hexagon from 'react-hexagon'

let userFoto ;
const usrCaminhoFoto = localStorage.getItem('usrCaminhoFoto');
if (usrCaminhoFoto !== null) {
   userFoto = usrCaminhoFoto;
}



 const HexaPerfil = ({history}) =>  {
    return (
           <Hexagon  flatTop="true" style={{stroke:"black", strokeWidth:7}} backgroundImage={`${userFoto}`} className="hexaFotoUsr" href="/perfil" />    
    )
}

export default HexaPerfil;