import { UploadBtn } from '../../components/botoes/styles';
import React, { useRef, useState, useEffect } from 'react';
import PageDefault from '../../components/pagedefault'
import { TrocaImagemPerfil, DivTrocaImagem, ImgPerfil, HexagonoTroca, HexagonoTroca1 } from './styles'
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
    let novoBlob;
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
              height: 320,
              width: 285,
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
        }).then(async (blob) => {
        console.log(blob);
        novoBlob = blob.replace("image/png", values.current.file.type);
        console.log(novoBlob);
        console.log(values.current.file)
        let formData = new FormData();
        await formData.append("foto", values.current.file,usuario);
        await alteraFotoUsuario({variables: {caminhoFoto: novoBlob, usrId: tokenusr.usrCodigo} })
        .then (async () => {
            await localStorage.removeItem("usrCaminhoFoto");
            await localStorage.setItem("usrCaminhoFoto",novoBlob)
        })
        try {
            e.preventDefault();
            const response = await fetch('http://179.221.167.201:8081/fotos/upload', {
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
    

    return(
        <PageDefault>
            <DivTrocaImagem>
                <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
                <div id="imagemPerfil">
                    
                </div>
                <HexagonoTroca>
                    <HexagonoTroca1>
                        <ImgPerfil/>
                    </HexagonoTroca1>
                </HexagonoTroca>
                <UploadBtn as="input" type="submit"  value="Upload" onClick={submitForm} />
            </DivTrocaImagem>
        </PageDefault>
    )
}

export default PagePerfil