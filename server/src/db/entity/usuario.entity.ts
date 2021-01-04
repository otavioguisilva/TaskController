import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import HoraTarefa from './horatarefa.entity';
import ObservacaoTar from './observacaotar.entity';
import Setor from './setor.entity';
import Tarefa from './tarefa.entity';

@ObjectType()
@Unique(['usrEmail'])
@Entity({ name: 'usuario' })
export default class Usuario {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'usr_codigo' })
    usrCodigo: number;

    @Field()
    @PrimaryColumn({ name: 'usr_login', length: 20 })
    usrLogin: string;

    @Field()
    @Column({ name: 'usr_nomecompleto' })
    usrNomecompleto: string;

    @Field()
    @Column({ name: 'usr_email', nullable: false })
    usrEmail: string;

    @Field()
    @Column({ name: 'usr_senha', length: 15, nullable: false })
    usrSenha: string;

    @Field(type => Int)
    @PrimaryColumn({ name: 'usr_strcodigo' })
    usrStrcodigo: number;

    @Field()
    @Column('date', { name: 'usr_dtnascimento' })
    usrDtnascimento: string;

    @Field()
    @Column({ type:'blob', name: 'usr_caminhofoto', nullable: true })
    usrCaminhoFoto: string;

    //Associações
    @ManyToOne(
        () => Setor,
        setor => setor.usuarioConnection,
    )
    @JoinColumn({ name: 'usr_strcodigo' })
    setorConnection: Promise<Setor>;

    @OneToMany(
        () => Tarefa,
        tarefa => tarefa.usuarioConnection,
    )
    tarefaConnection: Promise<Tarefa[]>;

    @OneToMany(
        () => HoraTarefa,
        horatarefa => horatarefa.usuarioConnection,
    )
    horatarefaConnection: Promise<HoraTarefa[]>;

    @OneToMany(
        () => ObservacaoTar,
        observacaotar => observacaotar.usuarioConnection,
    )
    observacaotarConnection: Promise<ObservacaoTar[]>;
}
