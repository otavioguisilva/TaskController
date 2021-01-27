import React, { useState } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
 
type novaMensagem = {
    chmCodigo: number,
    chmChaCodigo: number,
    chmData: string,
    chmHora: string,
    chmMensagem: string,
    chmUsrCodigoRem: number,
    usuarioRem: { 
        usrLogin: string,
        usrNomecompleto: string
}
};

type objectUser = {
    usrCodigo: number,
    usrLogin:string,
    usrNomecompleto: string,
    usrStrcodigo: number,
    usrCaminhoFoto:string,
    setor: {
        strDescricao:string
    }
}

export const HEAR_NEW_MESSAGE = gql`
    subscription($chmUsrCodigoDes: Float!){
        hearNewMessage(chmUsrCodigoDes: $chmUsrCodigoDes){
        chmCodigo,
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
const initialArrayMessageValues = [{
    chmCodigo:0,
    chmUsuario:'',
    chmData:'',
    chmHora:'',
    chmMensagem:''
}]

const ChatScreen =  () => {
    const [arrayMessage, setArrayMessage] = useState(initialArrayMessageValues)
    const tokenUser:string = JSON.stringify(localStorage.getItem('token'));
    const objectUser:objectUser = JSON.parse(JSON.parse(tokenUser));
    const usuario = objectUser.usrCodigo;
    const { data, loading } = useSubscription(HEAR_NEW_MESSAGE,
        { variables: { chmUsrCodigoDes:usuario }})
    if(loading){
        return <div>Loading...</div>
    }
    

   
    return (
        <>
           {data.hearNewMessage.chmMensagem} 
        </>
        
    )
}

export default ChatScreen;