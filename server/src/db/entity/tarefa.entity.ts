import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ClassificaTar, HoraTarefa, ObservacaoTar, Usuario } from './entities';

@ObjectType()
@Entity({ name: 'tarefa' })
export default class Tarefa {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'tar_codigo' })
    tarCodigo: number;

    @Field()
    @Column({ name: 'tar_titulo', length: 50, nullable: false })
    tarTitulo: string;

    @Field()
    @Column({ name: 'tar_descricao', nullable: false, type: 'longtext' })
    tarDescricao: string;

    @Field(type => Int)
    @Column({ name: 'tar_cltcodigo', nullable: false })
    tarCltcodigo: number;

    @Field({ nullable: true, defaultValue: 'CURRENT_TIMESTAMP' })
    @Column({ name: 'tar_dthrabert', type: 'datetime' })
    tarDtHrAbert: string;

    @Field({ nullable: true })
    @Column({ name: 'tar_status', length: 1, default: 'A' })
    tarStatus: string;

    @Field(type => Int)
    @Column({ name: 'tar_usrcodigo' })
    tarUsrcodigo: number;

    @Field({ nullable: true })
    @Column({ name: 'tar_dthrfecha', type: 'datetime', nullable: true })
    tarDtHrFecha: string;

    //Associações

    @ManyToOne(
        () => Usuario,
        usuario => usuario.tarefaConnection,
    )
    @JoinColumn({ name: 'tar_usrcodigo' })
    usuarioConnection: Promise<Usuario>;

    @ManyToOne(
        () => ClassificaTar,
        classificatar => classificatar.tarefaConnection,
    )
    @JoinColumn({ name: 'tar_cltcodigo' })
    classificatarConnection: Promise<ClassificaTar>;

    @OneToMany(
        () => HoraTarefa,
        horatarefa => horatarefa.tarefaConnection,
    )
    horatarefaConnection: Promise<HoraTarefa[]>;

    @OneToMany(
        () => ObservacaoTar,
        observacaotar => observacaotar.tarefaConnection,
    )
    observacaotarConnection: Promise<ObservacaoTar[]>;
}
