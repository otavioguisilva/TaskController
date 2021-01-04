import { UploadBtn } from '../../components/botoes/styles';
import React, { useRef, useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault'
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
    const [ imgNova, setImgNova ] = useState('')
    const [ novaFoto, setNovaFoto ] = useState('');
    const tokenusr = JSON.parse(localStorage.getItem('token'));
    const usuario = tokenusr.usrCodigo + tokenusr.usrLogin;
    let nomeFotousr =  tokenusr.usrCodigo + tokenusr.usrLogin;
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
        if(e.target.files && e.target.files[0]){
        const reader = new FileReader();

        reader.onload = function(ev){
            setNovaFoto({imageURI:ev.target.result});
        }
        reader.readAsDataURL(e.target.files[0]);

        }
    }

    const submitForm = async () => {
        if (!values.current.file) {
            return false;
        }
        let formData = new FormData();
        await formData.append("foto", values.current.file,usuario)
        await alteraFotoUsuario({variables: {caminhoFoto: imgNova, usrId: tokenusr.usrCodigo} })
        .then (async ({data}) => {
            await localStorage.removeItem("usrCaminhoFoto");
            await localStorage.setItem("usrCaminhoFoto",imgNova)
        })

        try {
            const response = await fetch('http://192.168.0.157:8081/fotos/upload', {
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
    

    useEffect(() => {
        if (novaFoto) {
            setImgNova(novaFoto.imageURI)
            console.log(novaFoto)
        }
    }, [novaFoto])

    return(
        <PageDefault>
            <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
           
                <img src={imgNova} width="290" height="290" alt="" />
            
            <UploadBtn as="input" type="submit"  value="Upload" onClick={() => submitForm()} />
        </PageDefault>
    )
}

export default PagePerfil