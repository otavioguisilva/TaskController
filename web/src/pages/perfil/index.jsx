import { UploadBtn } from '../../components/botoes/styles';
import React, { useRef, useState, useEffect } from 'react';
import PageDefault from '../../components/pagedefault'
import { TrocaImagemPerfil, DivTrocaImagem, DivTrocaFoto } from './styles'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Croppie from 'croppie';
import "croppie/croppie.css";
import Hexagon from 'react-hexagon' ;

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
    let nomeFotousr;
    let novoBlob;
    const [ novaFoto, setNovaFoto ] = useState('');
    const [croppie, setCroppie] = useState(null);
    const tokenusr = JSON.parse(localStorage.getItem('token'));
    const usuario = tokenusr.usrCodigo + tokenusr.usrLogin;
    const values = useRef({
        file : false,
    })

    function handleImage(image,id) {
        const el = document.getElementById(id)
        console.log(`"${id}"`)
        if (el) {
          const croppieInstance = new Croppie(el, {
            enableExif: true,
            showZoomer:false,
            viewport: {
                width: 177,
                height: 153,              
            },
            boundary: {
                width: 336, 
                height: 294 },
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
                    handleImage(ev.target.result, "imagemPerfil")
                    //handleImage(ev.target.result, "imagenPerfil")
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
            width:177,
            height:153
        },
        enableExif: true,
        }).then(async (blob) => {
        nomeFotousr = values.current.file.type.substr(6);
        if (nomeFotousr.match('gif')) {
            novoBlob = imgNova
            console.log("ok",novoBlob);
        } else {
            novoBlob = blob.replace("image/png", values.current.file.type);
        }
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
            if (response.ok) {
                window.location.reload()
            }
          } catch (err) {
            console.log(err);
          } 
        }
        )   
    }

    useEffect(() => {
        if (Hexagon) {
            const divHexagon = document.querySelector(".divHexagon");
            const getHexagon = document.querySelector('.hexaInsereFotoPerfil');
            getHexagon.style.width = "400px";
            getHexagon.style.height = "345.3px";
            divHexagon.style.top = "55%";
            const getPolygon = document.querySelector('.divHexagon polygon');
            getPolygon.style.strokeWidth = "243px"
        }
    }, [])

    useEffect(() => {
        if (novaFoto) {
            setImgNova(novaFoto.imageURI)
        }
    }, [novaFoto])

    useEffect(() => {
        if (document.querySelector(".cr-viewport")) {
            const viewport = document.querySelector(".cr-viewport");
            const boundary = document.querySelector(".cr-boundary");
            const divHexagon = document.querySelector(".divHexagon");
            divHexagon.style.top = "50%";
            divHexagon.style.display = "flex";
            boundary.insertBefore(divHexagon, boundary.firstChild);
            /* viewport.style.width = "0";
            viewport.style.height = "0";
            viewport.style.boxShadow = "0 0 0 0 rgba(0, 0, 0, 0.0)";
            viewport.style.border = "0px" */
            viewport.style.opacity = '0'
        }
    })

    return(
        <PageDefault>
            <DivTrocaImagem>
                <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
                    <div id="imagemPerfil" style={{overflow: "hidden", height:"345.3px", marginTop:"31px", marginLeft:"-3.2px"}}>                
                    </div>                
                <DivTrocaFoto className="divHexagon" style={{display:"none"}}>
                    <Hexagon flatTop="true" style={{stroke:"rgba(0, 0, 0, 0.8)", strokeWidth:"7"}} className="hexaInsereFotoPerfil"  />
                </DivTrocaFoto>
                <UploadBtn as="input" type="submit" style={{marginTop:"10px"}}  value="Upload" onClick={submitForm} />
            </DivTrocaImagem>
        </PageDefault>
    )
}

export default PagePerfil