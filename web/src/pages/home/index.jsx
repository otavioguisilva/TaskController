import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Menu from '../../components/menu/menu';

export const HEAR_NEW_MESSAGE = gql`
    subscription($chmUsrCodigoDes: Float!){
        hearNewMessage(chmUsrCodigoDes: $chmUsrCodigoDes){
        chmChaCodigo,
        chmData,
        chmHora,
        chmMensagem,
        chmUsrCodigoRem
        usuarioRem{
        usrLogin,
        usrNomecompleto,
        }  
    }
}
`



const HomePage =  () => {
    const [arrayMessage, setArrayMessage] = useState('[]')
    const teste = [{}];
    const tokenusr = JSON.parse(localStorage.getItem('token'));
    const usuario = Number(tokenusr.usrCodigo);
    console.log(arrayMessage);
    
    const { data : novaMensagem } = useSubscription(HEAR_NEW_MESSAGE,
        { variables: { chmUsrCodigoDes:usuario } }
      );
    if(novaMensagem){
        console.log(novaMensagem.hearNewMessage);
    }

   useEffect(() => {
       if (novaMensagem){
        const newObjectMessage = novaMensagem.hearNewMessage;
        setArrayMessage({
            ...arrayMessage,
            newObjectMessage,
        })
       }
   }, [novaMensagem, arrayMessage])
   
    return (
        <div className="">
            <Menu></Menu>
            {arrayMessage.lenght>0 ? arrayMessage.map((arrayMessagem) => (
               <div>{`${arrayMessagem.chmData} - ${arrayMessagem.chmHora} : ${arrayMessagem.chmMensagem}`}</div> 
            )) : <div></div>}
        </div>
        
    )
}

export default HomePage;