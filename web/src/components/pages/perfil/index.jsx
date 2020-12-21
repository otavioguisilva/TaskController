import { UploadBtn } from '../../botoes/styles';
import React, { useRef } from 'react';
import PageDefault from '../../pagedefault'
import { TrocaImagemPerfil } from './styles'

const PagePerfil = () => {
    const values = useRef({
        file : false,
    })

    const onFileChange = (e) => {
        values.current.file = e.target.files[0]
    }

    const submitForm = async () => {
        if (!values.current.file) {
            return false;
        }
        let formData = new FormData();
        console.log(values.current.file)
        formData.append("foto", values.current.file,values.current.file.name)
        

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
    }
    

    return(
        <PageDefault>
            <TrocaImagemPerfil type="file" onChange={(e) => onFileChange(e)} />
            <UploadBtn as="input" type="submit"  value="Upload" onClick={() => submitForm()} />
        </PageDefault>
    )
}

export default PagePerfil