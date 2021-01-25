import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class ChatMensagemInput {

    @Field(type => Int)
    readonly chmChaCodigo: number;

    @Field(type => Int)
    readonly chmUsrCodigoRem: number;

    @Field(type => Int)
    readonly chmUsrCodigoDes: number;

    @Field()
    readonly chmMensagem: string;
}

export default ChatMensagemInput