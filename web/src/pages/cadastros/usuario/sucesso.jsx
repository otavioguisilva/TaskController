import React from 'react';
import carregando from '../img/carregando.gif'


const Sucesso = ({history}) => {
    
    function redirect () {
        setTimeout(function () {
            history.push('/')   
        }, 3000);   
    }
    
    window.onload = redirect()

    return (

        <div className="center">
            <h1>Cadastro realizado com sucesso</h1>
            <h2>Você será redirecionado para a tela de Login</h2>
            <img alt="carregando" src={carregando} width="40"></img>
        </div>
    );
};

export default Sucesso;