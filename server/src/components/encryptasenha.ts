// prettier-ignore
function encryptaSenha (senhaDigitada, usuario) {
    senhaDigitada = senhaDigitada.padEnd(15, ' ');
    const cripA = (usuario.charCodeAt(0) % 15);
    const cripB = (usuario.charCodeAt(usuario.trim().length-1) % 15);
    const senha2 = senhaDigitada.substr(6,1)+senhaDigitada.substr(14,1)+senhaDigitada.substr(7,1)+senhaDigitada.substr(5,1)
        +senhaDigitada.substr(10,1)+senhaDigitada.substr(12,1)+senhaDigitada.substr(9,1)+senhaDigitada.substr(3,1)
        +senhaDigitada.substr(0,1)+senhaDigitada.substr(2,1)+senhaDigitada.substr(11,1)+senhaDigitada.substr(13,1) 
        +senhaDigitada.substr(1,1)+senhaDigitada.substr(8,1)+senhaDigitada.substr(4,1);
    const cripA1 = senha2.substr(cripA,1);
    const cripB1 = senha2.substr(cripB,1);
    let senha3 = senha2.substr(0,cripA)+cripB1+senha2.substring(cripA+1,senha2.length);
    senha3 = senha3.substr(0,cripB)+cripA1+senha3.substring(cripB+1,senha3.length);
    let senha5 = '';
    for (let index = 1; index< 16; index++) {
        let senha4=(((senha3.charCodeAt(index-1)+cripA+cripB+2)*index*6)%95) + 32;
        if(senha4 == 34 || senha4 == 39 || senha4 == 47 || senha4 == 92) {
            senha4 = 38
        }
        senha5 += String.fromCharCode(senha4);
    }
    const senhaFinal = senha5;
    return senhaFinal
}

export default encryptaSenha;
