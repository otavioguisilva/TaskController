import { Field, InputType } from '@nestjs/graphql';
import TarefaInput from './tarefa.input';
import UsuarioInput from './usuario.input';
import ClassificaHoraInput from './classificahora.input';

// @InputType()
// class HtrTarConnectInput {
//     @Field()
//     readonly tarCodigo: number;
// }

// @InputType()
// class HtrTarInput {
//     @Field({ nullable: true })
//     readonly connect: HtrTarConnectInput;

//     @Field({ nullable: true })
//     readonly create: TarefaInput;
// }

// @InputType()
// class HtrUsrConnectInput {
//     @Field()
//     readonly usrCodigo: number;
// }

// @InputType()
// class HtrUsrInput {
//     @Field({ nullable: true })
//     readonly connect: HtrUsrConnectInput;

//     @Field({ nullable: true })
//     readonly create: UsuarioInput;
// }

// @InputType()
// class HtrClhConnectInput {
//     @Field()
//     readonly clhCodigo: number;
// }

// @InputType()
// class HtrClhInput {
//     @Field({ nullable: true })
//     readonly connect: HtrClhConnectInput;

//     @Field({ nullable: true })
//     readonly create: ClassificaHoraInput;
// }

@InputType()
class HoraTarefaInput {
    @Field({ nullable: true })
    readonly htrTarcodigo: number;

    @Field()
    readonly htrUsrcodigo: number;

    @Field({ nullable: true })
    readonly htrClhcodigo: number;

    @Field({ nullable: true })
    readonly htrData: string;

    @Field({ nullable: true })
    readonly htrTipo: string;

    @Field({ nullable: true })
    readonly htrHoras: number;

    @Field({ nullable: true })
    readonly htrMinutos: number;

    @Field({ nullable: true })
    readonly htrDescricao: string;

    @Field({ nullable: true })
    readonly htrStatus: string;
}

export default HoraTarefaInput;
