import styled from 'styled-components';
import { imgTarefa, imgClientes, imgClassificacao, imgSetor } from '../img/imagens'

const corHexa = '00a2e8';

function brilho(hex, luminosity=0) {
    hex = hex.replace(/[^0-9a-f]/gi, '');
    const isValidHex = hex.length === 6 || hex.length === 3;
    if (!isValidHex) throw new Error ("Invalid HEX");
    if (hex.lenght === 3 ) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    const black = 0;
    const white = 255;
    const twoDigitGroup = hex.match(/([0-9a-f]){2}/gi)
    let newHex = '#'
    for(let twoDigit of twoDigitGroup) {
        const numberFromHex = parseInt(twoDigit, 16);
        const calculateLuminosity = numberFromHex + (luminosity * 255);
        const blackOrLuminosity = Math.max(black, calculateLuminosity);
        const partialColor = Math.min(white, blackOrLuminosity);
        const newColor = Math.round(partialColor);
        const numberToHex = newColor.toString(16);
        const finalHex = `0${numberToHex}`.slice(-2);
        newHex = newHex + finalHex;
    }
    return newHex;
}

export const Hexagono = styled.div`
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

export const Hexagono1 = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    
`
export const Tarefa = styled.div`
    background-size: 75%;
    background-color: ${brilho(corHexa, 0)};
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(${imgTarefa});
    visibility: visible;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    &:hover,
    &:focus {
    background-color: ${brilho(corHexa, 0.2)};
     top:-2px;
     box-shadow:0 2px 2px #666;
     transition: all 0.5s ease-in-out;  
    }
    `

export const Clientes = styled.div`
    background-size: 75%;
    background-color: ${brilho(corHexa, 0)};
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(${imgClientes});
    visibility: visible;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    &:hover,
    &:focus {
    background-color: ${brilho(corHexa, 0.2)};
     top:-2px;
     box-shadow:0 2px 2px #666;
     transition: all 0.5s ease-in-out;  
    }
    `
export const Classificacao = styled.div`
background-size: 75%;
background-color: ${brilho(corHexa, 0)};
background-position: center;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-position: 50%;
background-image: url(${imgClassificacao});
visibility: visible;
-webkit-transform: rotate(-60deg);
-moz-transform: rotate(-60deg);
-ms-transform: rotate(-60deg);
-o-transform: rotate(-60deg);
transform: rotate(-60deg);
&:hover,
&:focus {
background-color: ${brilho(corHexa, 0.2)};
 top:-2px;
 box-shadow:0 2px 2px #666;
 transition: all 0.5s ease-in-out;  
}
`
export const Setor = styled.div`
    background-size: 75%;
    background-color: ${brilho(corHexa, 0)};
    background-position: center;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(${imgSetor});
    visibility: visible;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    &:hover,
    &:focus {
    background-color: ${brilho(corHexa, 0.2)};
     top:-2px;
     box-shadow:0 2px 2px #666;
     transition: all 0.5s ease-in-out;  
    }
    `

export const MenuNav = styled.div`
    background-color:gray;
    width:100%;
    height:155px;
    border-bottom: solid 2px black;
    border-radius:1pt;
`


export const MenuCima = styled.div`
    position:absolute;
    left:35px;
    height:70px;
    width:70%;
    `

export const MenuBaixo = styled.div`
    width:70%;
    height:70px;
    top:70px;
    position: absolute;
`

export const Perfil = styled.div`
    display: flex;
    border-top:solid, #fff , 20px;
    background-size: 100%;
    background-color: ${brilho(corHexa, 0)};
    background-position: center;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    visibility: visible;
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    transform: rotate(-60deg);
    &:hover,
    &:focus {
        filter: brightness(1.20)
    };
    `

export const HexagonoPerfil = styled.div`
position: absolute;
right:20px;
float:right;
overflow: hidden;
visibility: hidden;
-webkit-transform: rotate(120deg);
-moz-transform: rotate(120deg);
-ms-transform: rotate(120deg);
-o-transform: rotate(120deg);
transform: rotate(120deg);
cursor: pointer;
width: 125px;
height: 175px;
margin: 0 0 0 20px;
top:-10px;
`

export const ImagemPerfil = styled.img`
overflow: hidden;
`