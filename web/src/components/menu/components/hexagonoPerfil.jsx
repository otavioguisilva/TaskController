import React, { useEffect } from 'react';
import Hexagon from 'react-hexagon'

let userFoto ;
const usrCaminhoFoto = localStorage.getItem('usrCaminhoFoto');
if (usrCaminhoFoto !== null) {
   userFoto = usrCaminhoFoto;
}



 const HexaPerfil = ({history}) =>  {

   useEffect(() => {
      if(Hexagon) {
         const hexagon = document.querySelector(".hexaFotoUsr").firstChild.firstChild.firstChild;
         hexagon.x.baseVal.value = 0
      }
   })
    return (
           <Hexagon  flatTop="true" style={{stroke:"black", strokeWidth:0, objectFit:"contain"}} backgroundImage={`${userFoto}`} className="hexaFotoUsr" href="/perfil" />    
    )
}

export default HexaPerfil;