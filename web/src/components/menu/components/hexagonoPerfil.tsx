import React, { useEffect } from 'react';
import Hexagon from 'react-hexagon'

let userFoto:string ;
const usrCaminhoFoto = localStorage.getItem('usrCaminhoFoto');
if (usrCaminhoFoto !== null) {
   userFoto = usrCaminhoFoto;
}

type THexagon = {
      x : {
         baseVal: {
            value: number
         }
      } 
}

type TGet = {
   ChildNode : ChildNode
}



 const HexaPerfil:React.FC = () =>  {

   useEffect(() => {
      if(Hexagon) {
         const getHexa = document.querySelector(".hexaFotoUsr")?.firstChild?.firstChild?.firstChild as ChildNode;
         const hexagon:(THexagon | ChildNode) = getHexa;
         hexagon.x.baseVal.value = 0
      }
   })
   
    return (
           <Hexagon  flatTop="true" style={{stroke:"black", strokeWidth:0, objectFit:"contain"}} backgroundImage={`${userFoto}`} className="hexaFotoUsr" href="/perfil" />    
    )
}

export default HexaPerfil;