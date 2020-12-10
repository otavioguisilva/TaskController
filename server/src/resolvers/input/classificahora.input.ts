import { Field, InputType } from '@nestjs/graphql';
import SetorInput from './setor.input';

// @InputType()
// class ClhStrConnectInput {
//     @Field()
//     readonly strCodigo: number;
// }

// @InputType()
// class ClhStrInput {
//     @Field({ nullable: true })
//     readonly connect: ClhStrConnectInput;

//     @Field({ nullable: true })
//     readonly create: SetorInput;
// }

@InputType()
class ClassificaHoraInput {
    @Field()
    clhDescricao: string;

    @Field()
    clhStrcodigo: number;
}

export default ClassificaHoraInput;
