import { UploadBtn } from '../../botoes/styles';
import React, { useState } from 'react';
import PageDefault from '../../pagedefault'
import { TrocaImagemPerfil } from './styles'
import axios from 'axios'

const PagePerfil = () => {
    const [ selectedFile, setSelectedFile ] = useState(null)
    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = () => {
        console.log(selectedFile)
    }

    return(
        <PageDefault>
            <TrocaImagemPerfil type="file" onChange={fileSelectedHandler} />
            <UploadBtn as="input" type="submit"  value="Upload" onClick={fileUploadHandler} />
        </PageDefault>
    )
}

export default PagePerfil