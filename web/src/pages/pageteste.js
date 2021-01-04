import React from 'react';
import PageDefault from '../components/pagedefault';


const PageTeste = () => {

  const caminho = localStorage.getItem("usrCaminhoFoto");

    return (
        <PageDefault>
            <img alt="" src={`data:image/png;base64,${caminho}`} />
        </PageDefault>
        
    )
}

export default PageTeste;