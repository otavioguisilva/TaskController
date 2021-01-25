import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ClassificaHoraInput {
    @Field()
    clhDescricao: string;

    @Field()
    clhStrcodigo: number;
}

export default ClassificaHoraInput;
