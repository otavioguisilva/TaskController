import { Field, InputType } from '@nestjs/graphql';


// @InputType()
// class ObtTarConnectInput {
//     @Field()
//     readonly tarCodigo: number;
// }

// @InputType()
// class ObtTarInput {
//     @Field({ nullable: true })
//     readonly connect: ObtTarConnectInput;

//     @Field({ nullable: true })
//     readonly create: TarefaInput;
// }

// @InputType()
// class ObtUsrConnectInput {
//     @Field()
//     readonly usrCodigo: number;
// }

// @InputType()
// class ObtUsrInput {
//     @Field({ nullable: true })
//     readonly connect: ObtUsrConnectInput;

//     @Field({ nullable: true })
//     readonly create: UsuarioInput;
// }

@InputType()
class ObservacaoTarInput {
    @Field()
    readonly obtTarcodigo: number;

    @Field()
    readonly obtUsrcodigo: number;

    @Field()
    readonly obtDatahora: Date;

    @Field()
    readonly obtObservacao: string;
}

export default ObservacaoTarInput;
