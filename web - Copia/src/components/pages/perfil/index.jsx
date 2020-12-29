import { UploadBtn } from '../../botoes/styles';
import React, { useRef } from 'react';
import PageDefault from '../../pagedefault'
import { TrocaImagemPerfil } from './styles'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const ALTERA_FOTO_USUARIO = gql`
mutation($caminhoFoto: String!, $usrId: Float!){
    alteraFotoUsuario(caminhoFoto: $caminhoFoto, usrId: $usrId)
    {
      usrCaminhoFoto
    }
}
`;

const PagePerfil = () => {
    const tokenusr = JSON.parse(localStorage.getItem('token'));
    const usuario = tokenusr.usrCodigo + tokenusr.usrLogin;
    let nomeFotousr =  tokenusr.usrCodigo + tokenusr.usrLogin;
    const values = useRef({
        file : false,
    })
    let usuarioCFoto = {};

    const [alteraFotoUsuario] = useMutation(ALTERA_FOTO_USUARIO, 
        {
            onCompleted({alteraFotoUsuario}) {
            }
        }
    );

    const onFileChange = (e) => {
        values.current.file = e.target.files[0]
    }

    const submitForm = async () => {
        if (!values.current.file) {
            return false;
        }
        let formData = new FormData();
        await formData.append("foto", values.current.file,usuario)
        nomeFotousr = nomeFotousr + '.' + values.current.file.type.substr(6)
        await alteraFotoUsuario({variables: {caminhoFoto: usuario+"/" +nomeFotousr, usrId: tokenusr.usrCodigo} })
        .then (async ({data}) => {
            usuarioCFoto = data.alteraFotoUsuario
            await localStorage.removeItem("usrCaminhoFoto");
            await localStorage.setItem("usrCaminhoFoto",usuarioCFoto.usrCaminhoFoto)
        })

        try {
            const response = await fetch('http://192.168.0.27:8081/upload/upload', {
              method: 'POST',
              body: formData,
            });
            if (!response.ok) {
              throw new Error(response.statusText);
            }
      
            console.log(response);
          } catch (err) {
            console.log(err);
          }
    }
    

    return(
        <PageDefault>
            <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
            <UploadBtn as="input" type="submit"  value="Upload" onClick={() => submitForm()} />
        </PageDefault>
    )
}

export default PagePerfil