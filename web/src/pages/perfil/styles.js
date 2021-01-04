import styled from 'styled-components';

export const TrocaImagemPerfil = styled.input`
    
`

export const DivTrocaImagem = styled.div `
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    flex-direction: column;
    align-items: center;
    width:100%;
`

export const ImgPerfil = styled.img`
    overflow: hidden;
    width:125px;
    height:175px;
    background-color:blue;
`

export const HexagonoTroca = styled.div`
    float:left;
    overflow: hidden;
    visibility: hidden;
    -webkit-transform: rotate(120deg);
    -moz-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    -o-transform: rotate(120deg);
    transform: rotate(120deg);
    cursor: pointer;
    width: 50px;
    height: 70px;
    margin: 0 0 0 20px;
    &:hover,
    &:focus {
    transition: all 0.5s ease-in-out;
    width: 60px;
    height: 90px;
    margin: 0 0 0 20px;
    }
`

export const HexagonoTroca1 = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    
`