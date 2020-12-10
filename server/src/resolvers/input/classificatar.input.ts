import { Field, InputType } from '@nestjs/graphql';
import SetorInput from './setor.input';

// @InputType()
// class CltStrConnectInput {
//     @Field()
//     readonly strCodigo: number;
// }

// @InputType()
// class CltStrInput {
//     @Field({ nullable: true })
//     readonly connect: CltStrConnectInput;

//     @Field({ nullable: true })
//     readonly create: SetorInput;
// }

@InputType()
class ClassificaTarInput {
    @Field()
    cltDescricao: string;

    @Field()
    cltStrcodigo: number;
}

export default ClassificaTarInput;
