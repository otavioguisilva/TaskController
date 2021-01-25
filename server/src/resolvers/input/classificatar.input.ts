import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ClassificaTarInput {
    @Field()
    cltDescricao: string;

    @Field()
    cltStrcodigo: number;
}

export default ClassificaTarInput;
