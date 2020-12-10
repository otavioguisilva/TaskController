import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'endereco' })
export default class Endereco {
    @Field()
    @PrimaryGeneratedColumn({ type: 'int', name: 'end_codigo' })
    endCodigo: number;

    @Field()
    @Column('int', { primary: true, name: 'end_cep' })
    endCep: number;

    @Field()
    @Column('varchar', { name: 'end_logradouro', length: 255 })
    endLogradouro: string;

    @Field()
    @Column('varchar', { name: 'end_numero', length: 10, default: () => "'S/N'" })
    endNumero: string;

    @Field()
    @Column('varchar', { name: 'end_bairro', length: 255 })
    endBairro: string;

    @Field()
    @Column('varchar', { name: 'end_cidade', length: 255 })
    endCidade: string;

    @Field()
    @Column('varchar', { name: 'end_uf', length: 2 })
    endUf: string;

    @ManyToOne(
        () => Cliente,
        cliente => cliente.enderecoConnection,
    )
    @JoinColumn([{ name: 'end_clicodigo' }])
    clienteConnection: Promise<Cliente>;
}
