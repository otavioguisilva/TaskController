import { Field, InputType } from '@nestjs/graphql';

// @InputType()
// class UsuarioSetorConnectInput {
//     @Field()
//     readonly strCodigo: number;
// }

// @InputType()
// class UsuarioSetorInput {
//     @Field({ nullable: true })
//     readonly connect: UsuarioSetorConnectInput;

//     @Field({ nullable: true })
//     readonly create: SetorInput;
// }

@InputType()
class UsuarioInput {
    @Field()
    readonly usrLogin: string;

    @Field()
    readonly usrNomecompleto: string;

    @Field()
    readonly usrEmail: string;

    @Field()
    readonly usrSenha: string;

    @Field()
    readonly usrStrCodigo: number;

    @Field()
    readonly usrDtnascimento: string;
}

export default UsuarioInput;
