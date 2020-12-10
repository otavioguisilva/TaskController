import { Field, InputType } from '@nestjs/graphql';

@InputType()
class SetorInput {
    @Field()
    readonly strDesc: string;
}

export default SetorInput;
