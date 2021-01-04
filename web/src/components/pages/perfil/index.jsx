import { UploadBtn } from '../../botoes/styles';
import React, { useRef, useState, useEffect } from 'react';
import PageDefault from '../../pagedefault'
import { TrocaImagemPerfil, DivTrocaImagem, ImgPerfil } from './styles'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Croppie from 'croppie'
import "croppie/croppie.css"

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
    const [croppie, setCroppie] = useState(null);
    const tokenusr = JSON.parse(localStorage.getItem('token'));
    const usuario = tokenusr.usrCodigo + tokenusr.usrLogin;
    const values = useRef({
        file : false,
    })

    function handleImage(image) {
        const el = document.getElementById("imagemPerfil")
        if (el) {
          const croppieInstance = new Croppie(el, {
            enableExif: true,
            viewport: {
              height: 175,
              width: 125,
            },
            boundary: {
                height: 290,
                width: 290
            },
            showZoomer: false,
        });
        croppieInstance.bind({
          url: image
        });
        setCroppie(croppieInstance)
        }
      }
    

    const [alteraFotoUsuario] = useMutation(ALTERA_FOTO_USUARIO, 
        {
            onCompleted({alteraFotoUsuario}) {
            }
        }
    );

    const onFileChange = (e) => {
        if (e.target.files[0].type.match("image")) {
            values.current.file = e.target.files[0]
            if(e.target.files && e.target.files[0]){
                const reader = new FileReader();
                reader.onload = function(ev){
                    setNovaFoto({imageURI:ev.target.result});
                    handleImage(ev.target.result)
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        } else {
            e.target.value = "";
            return false;
        }
    }

    async function submitForm(e) {
        if (!values.current.file) {
            return false;
        }
        croppie.result({type: 'base64',
        size: {
            width: 125,
            height: 175
        }}).then(async (blob) => {
          setImgNova(blob)
          let formData = new FormData();
        await formData.append("foto", values.current.file,usuario)
        await alteraFotoUsuario({variables: {caminhoFoto: blob, usrId: tokenusr.usrCodigo} })
        .then (async () => {
            await localStorage.removeItem("usrCaminhoFoto");
            await localStorage.setItem("usrCaminhoFoto",blob)
        })
        try {
            e.preventDefault();
            const response = await fetch('http://localhost:8081/fotos/upload', {
              method: 'POST',
              body: formData,
            });
            e.preventDefault();
            if (!response.ok) {
              throw new Error(response.statusText);
            }
          } catch (err) {
            console.log(err);
          }
        }
        )   
    }
    

    useEffect(() => {
        if (croppie) {
            setImgNova(novaFoto.imageURI)
            console.log(novaFoto)
        }
    }, [novaFoto])

    return(
        <PageDefault>
            <DivTrocaImagem>
                <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
                <div id="imagemPerfil">
                    
                </div>
                <UploadBtn as="input" type="submit"  value="Upload" onClick={submitForm} />
            </DivTrocaImagem>
        </PageDefault>
    )
}

export default PagePerfil