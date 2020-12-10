import { Field, InputType } from '@nestjs/graphql';
import ClassificaTarInput from './classificatar.input';
import UsuarioInput from './usuario.input';

// @InputType()
// class TarCltConnectInput {
//     @Field()
//     readonly cltCodigo: number;
// }

// @InputType()
// class TarCltInput {
//     @Field({ nullable: true })
//     readonly connect: TarCltConnectInput;

//     @Field({ nullable: true })
//     readonly create: ClassificaTarInput;
// }

// @InputType()
// class TarUsrConnectInput {
//     @Field()
//     usrCodigo: number;
// }

// @InputType()
// class TarUsrInput {
//     @Field({ nullable: true })
//     readonly connect: TarUsrConnectInput;

//     @Field({ nullable: true })
//     readonly create: UsuarioInput;
// }

@InputType()
class TarefaInput {
    @Field()
    readonly tarTitulo: string;

    @Field()
    readonly tarDescricao: string;

    @Field()
    readonly tarCltcodigo: number;

    @Field({ nullable: true })
    readonly tarDtHrAbert: Date;

    @Field({ nullable: true })
    readonly tarStatus: string;

    @Field()
    readonly tarUsrcodigo: number;

    @Field({ nullable: true })
    readonly tarDtHrFecha: Date;
}

export default TarefaInput;
