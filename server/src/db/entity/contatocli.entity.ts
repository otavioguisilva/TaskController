import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './entities';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'contatocli' })
export default class ContatoCli {
    @Field()
    @PrimaryGeneratedColumn({ type: 'int', name: 'cnt_codigo' })
    cntCodigo: number;

    @Field()
    @Column('int', { name: 'cnt_telefone' })
    cntTelefone: number;

    @Field()
    @Column('varchar', { name: 'cnt_descricao', nullable: true, length: 30 })
    cntDescricao: string | null;

    @Field()
    @Column('varchar', { name: 'cnt_email', nullable: true, length: 255 })
    cntEmail: string | null;

    @ManyToOne(
        () => Cliente,
        cliente => cliente.contatoCliConnection,
    )
    @JoinColumn([{ name: 'cnt_clicodigo' }])
    clienteConnection: Promise<Cliente>;
}
