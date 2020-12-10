import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import GrupoCliente from './grupocliente.entity';
import ContatoCli from './contatocli.entity';
import Endereco from './endereco.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'cliente' })
export default class Cliente {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'cli_codigo' })
    cliCodigo: number;

    @Field()
    @Column({ name: 'cli_razao', length: 60 })
    cliRazao: string;

    @Field()
    @Column({ name: 'cli_fantasia', length: 150 })
    cliFantasia: string;

    @Field()
    @Column({
        name: 'cli_tipopessoa',
        length: 1,
        default: () => "'J'",
    })
    cliTipopessoa: string;

    @Field()
    @Column({ name: 'cli_cpfcnpj', length: 20 })
    cliCpfcnpj: string;

    @Field()
    @Column('varchar', {
        name: 'cli_inscricao',
        length: 20,
        default: () => "'ISENTO'",
    })
    cliInscricao: string;

    @Field(type => Int)
    @Column({ name: 'cli_grccodigo', nullable: true })
    cliGrccodigo: number;

    @Field(type => Int)
    @Column({ name: 'cli_atvcodigo', nullable: true })
    cliAtvcodigo: number;

    @Field()
    @Column({ name: 'cli_contato', nullable: true, length: 255 })
    cliContato: string;

    @ManyToOne(
        () => GrupoCliente,
        grupocliente => grupocliente.clienteConnection,
    )
    @JoinColumn([{ name: 'cli_grccodigo' }])
    grupoClienteConnection: Promise<GrupoCliente>;

    @OneToMany(
        () => ContatoCli,
        contatocli => contatocli.clienteConnection,
    )
    contatoCliConnection: Promise<ContatoCli[]>;

    @OneToMany(
        () => Endereco,
        endereco => endereco.clienteConnection,
    )
    enderecoConnection: Promise<Endereco[]>;
}
