import React, { useState, useContext }  from 'react';
import { gql } from 'apollo-boost';
import '../Formatacao.css';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import StoreContext from '../../Store/context';
import { ErrorMessage, DivLoginBtn, LoginBtn } from './styles';


export const LOGIN_USUARIO = gql`
mutation($loginOrEmail: String!, $senha: String!){
    loginUsuario(loginOrEmail: $loginOrEmail, senha: $senha)
    {
      usrCodigo
      usrLogin
      usrNomecompleto
      usrStrcodigo
      usrCaminhoFoto
      setor {
          strDescricao
      }
    }
  }
`;

const Home = ({ history }) => {
    const [ input, setInput ] = useState('');
    const [ inputS, setInputS ] = useState('');
    const { setToken } = useContext(StoreContext)
    const [ messageErro , setMessageErro ] = useState('');
    let usuario = {};
    let erro;
    let msgErro


    const [loginUsuario] = useMutation(LOGIN_USUARIO, 
        {
            onCompleted({loginUsuario}) {
            }
        }
    );

    async function logar(e) {
        e.preventDefault();
        await loginUsuario ({variables: {loginOrEmail: input, senha: inputS} })
        .then(({data}) => {
            usuario = data.loginUsuario;
        })
        .catch((error) => {
            setMessageErro(`* ${error.message}`);
            erro = true;
            msgErro = error.message;
            if (msgErro.includes('Senha')) {
                setInputS('');    
            } else {
            setInput('');
            setInputS('');
        }
        })
        if (!erro) {
        setInput('');
        setInputS('');
        await setToken(usuario);
        await localStorage.setItem("usrCaminhoFoto",usuario.usrCaminhoFoto)
        window.location.href = `/home`
        }
        
    }

  return (
    <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Entrar</h3>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            
                            <input value={input} onChange={e => setInput(e.target.value)} type="text" className="form-control" placeholder="Usuário"/>
                            
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input value={inputS} onChange={e => setInputS(e.target.value)} type="password" className="form-control" placeholder="Senha"/>
                        </div>
                        <ErrorMessage>{messageErro}</ErrorMessage>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Salvar Senha
                        </div>
                        <DivLoginBtn>
                            <LoginBtn as="input" type="submit" onClick={logar} value="Login" className="btn float-right login_btn"/>
                        </DivLoginBtn>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Não tem conta?<Link to="/cadastro/usuario">Cadastre-se</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default Home;
