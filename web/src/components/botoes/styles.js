import styled from 'styled-components';

export const UploadBtn = styled.button`
    color: black;
    background-color: #FFC312;
    width: 10%;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
    :hover{
    color: black;
    filter: brightness(1.1);
    }
    :focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;
    display: inline-block;
    }
`