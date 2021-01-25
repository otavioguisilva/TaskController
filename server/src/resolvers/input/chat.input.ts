import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ChatInput {
    @Field({ nullable: true })
    readonly chaCodigo: number;

    @Field()
    readonly chaUsuarios: string;
};

export default ChatInput;