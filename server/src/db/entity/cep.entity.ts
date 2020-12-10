import { Column, Entity } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('cep', { schema: 'taskcontroller' })
export default class Cep {
    @Field()
    @Column('int', { primary: true, name: 'cep_codigo' })
    cepCodigo: number;

    @Field()
    @Column('varchar', { name: 'cep_logradouro', length: 255 })
    cepLogradouro: string;

    @Field()
    @Column('varchar', { name: 'cep_bairro', length: 255 })
    cepBairro: string;

    @Field()
    @Column('varchar', { name: 'cep_cidade', length: 255 })
    cepCidade: string;

    @Field()
    @Column('varchar', { name: 'cep_uf', length: 2 })
    cepUf: string;
}
