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
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const realRandomName = randomName.substr(1,32);
    const usuario = tokenusr.usrCodigo + tokenusr.usrLogin;
    const nomeFotousr = realRandomName + tokenusr.usrCodigo + tokenusr.usrLogin + '.jpg';
    const values = useRef({
        file : false,
    })

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
        console.log(values.current.file)
        formData.append("foto", values.current.file,nomeFotousr)
        

        try {
            const response = await fetch('http://localhost:8081/upload/upload', {
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

        
        await alteraFotoUsuario ({variables: {caminhoFoto: usuario+"/" +nomeFotousr, usrId: tokenusr.usrCodigo} })
    }
    

    return(
        <PageDefault>
            <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
            <UploadBtn as="input" type="submit"  value="Upload" onClick={() => submitForm()} />
        </PageDefault>
    )
}

export default PagePerfil