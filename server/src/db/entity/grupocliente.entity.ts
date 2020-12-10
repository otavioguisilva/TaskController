import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cliente from './cliente.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'grupocliente' })
export default class GrupoCliente {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'grc_codigo' })
    grcCodigo: number;

    @Field()
    @Column({ name: 'grc_descricao', length: 255 })
    grcDescricao: string;

    @OneToMany(
        () => Cliente,
        cliente => cliente.grupoClienteConnection,
    )
    clienteConnection: Promise<Cliente[]>;
}
