import styled from 'styled-components';

export const ErrorMessage = styled.p`
    font-size:10pt;
    color:rgb(250, 1, 20);
    position: absolute;
    top:51%;
`

export const DivLoginBtn = styled.div`
    position: absolute;
    top:65%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`

export const LoginBtn = styled.button`
    position: absolute;
    top:65%;
    color: black;
    background-color: #FFC312;
    width: 100%;
    &hover{
    color: black;
    background-color:white;
    }
    &focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;
    }
`

export const DivCadBtn = styled.div`
    position: absolute;
    top:130%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const CadBtn = styled.button`
    position: absolute;
    top:65%;
    color: black;
    background-color: #FFC312;
    width: 100%;
    &:hover{
    color: black;
    background-color:white;
    }
    &:focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;
    }
`
export const DivLinkVoltar = styled.div`
    position: absolute;
    top:300%;
    width:100%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    flex-direction: column;
    align-items: center;
`