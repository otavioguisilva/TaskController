import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const H1404 =styled.div`
    justify-content:center;
    height: 300px;
    width: 500px;
    color: white;
    display:flex;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border:2px solid white;
    border-radius:10pt;
` 

const Page404 = () => {
    return(
            <H1404 ><h1>Erro 404 <br/> Página não encontrada</h1>
            <div className="d-flex justify-content-center links">
            Voltar para a <Link to="/">Página Principal</Link>
            </div>
            </H1404>
    )
}

export default Page404