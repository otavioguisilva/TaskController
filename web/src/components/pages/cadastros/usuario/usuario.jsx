import React, { useState } from 'react';
import '../../Formatacao.css';
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CadBtn, DivCadBtn, DivLinkVoltar } from '../../login/styles';


const INSERE_USUARIO = gql`
    mutation($usrLogin: String!,
            $usrDtnascimento: String!,
            $usrEmail: String!,
            $usrSenha: String!,
            $usrNomecompleto: String!,
            $usrStrCodigo: Float!, ) {
        insereUsuario(datas: {
            usrLogin: $usrLogin
            usrDtnascimento: $usrDtnascimento
            usrEmail: $usrEmail
            usrSenha: $usrSenha
            usrNomecompleto: $usrNomecompleto
            usrStrCodigo: $usrStrCodigo
        }) 
        {
            usrLogin
        }
    }
    `

const ALL_SETORES = gql `
    query {
        allSetores {
            strCodigo
            strDescricao
        }
    }
`

const PageCadUsr = ({history}) => {
    
    const [ inputNome, setInputNome ] = useState('');
    const [ inputDataNasc, setInputDataNasc ] = useState('');
    const [ inputLogin, setInputLogin ] = useState('');
    const [ inputEmail, setInputEmail ] = useState('');
    const [ inputSenha, setInputSenha ] = useState('');
    const [ inputSetor, setInputSetor ] = useState('');
    let cadastrou =  false;
    let erro = false;

    const [insereUsuario] = useMutation(INSERE_USUARIO,
        {
        onCompleted({insereUsuario}) {
            cadastrou = true
        }
    })

    const { data  } = useQuery(ALL_SETORES);

    async function cadastraUsuario(e) {
        let errorMessage;
        e.preventDefault();
        const form = document.querySelector('.formulario');
        const checar = form.checkValidity();
        form.reportValidity();
        if (checar) {
            await insereUsuario({variables: {
                usrLogin: inputLogin,
                usrDtnascimento: inputDataNasc,
                usrEmail: inputEmail,
                usrSenha: inputSenha,
                usrNomecompleto: inputNome,
                usrStrCodigo: parseInt(inputSetor)
            }}).then(() => {
                cadastrou = true;
            })
            .catch((e) => {
                erro = true
                errorMessage = e.message
            })
            if (erro) {
                window.alert(errorMessage)
                erro = false
                return;
            }
            setInputDataNasc('');
            setInputEmail('');
            setInputLogin('');
            setInputNome('');
            setInputSenha('');
            setInputSetor('');
            if (cadastrou) {
                history.push('/cadastro/usuario/sucesso');
                cadastrou = false
            }
        }
    }

    function mudaInput() {
        const valor = document.querySelector('#seletor').value;
        setInputSetor(valor);
    }

    return (
    <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="cad">
                <div className="card-header">
                    <h3>Área de Cadastro</h3>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="card-body">
                    <form className="formulario">
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" value={inputNome} onChange={e => setInputNome(e.target.value)} placeholder="Nome Completo" required/>
                            
                        </div>
                        
                        <div className="input-date form-group">
                            <div className="input-group-date">
                                
                            </div>
                            <input type="date" className="form-control" value={inputDataNasc} onChange={e => setInputDataNasc(e.target.value)} required/>
                            
                        </div>
                        
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Usuário" value={inputLogin} maxLength='20' onChange={e => setInputLogin(e.target.value)} required/>
                            
                        </div>
                        
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input type="email" className="form-control" value={inputEmail} onChange={e => setInputEmail(e.target.value)} placeholder="Email" required/>
                            
                        </div>
                        
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="Senha" value={inputSenha} maxLength='15' onChange={e => setInputSenha(e.target.value)} required/>
                        </div>
                        
                        <div className="input-group form-select">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <select className="form-control" id="seletor" onChange={mudaInput} required>
                                <option value=''>Selecione o Setor</option>
                                {data?.allSetores.map(item => (
                                    <option value={item.strCodigo}>{item.strDescricao}</option>
                                ))}
                            </select>                                   
                            <DivCadBtn>
                                <CadBtn as="input" type="submit" onClick={cadastraUsuario} value="Cadastrar" className="btn float-right login_btn"/>
                            </DivCadBtn>
                            <DivLinkVoltar>
                                <div className="d-flex justify-content-center links">
                                    Voltar para tela de <Link to="/">Login</Link>
                                </div>
                            </DivLinkVoltar>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    )
   
}

export default PageCadUsr