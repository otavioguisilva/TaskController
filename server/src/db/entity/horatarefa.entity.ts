import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ClassificaHora from './classificahora.entity';
import HoraTarefaAut from './horatarefaaut.entity';
import Tarefa from './tarefa.entity';
import Usuario from './usuario.entity';

@ObjectType()
@Entity({ name: 'horatarefa' })
export default class HoraTarefa {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'htr_codigo' })
    htrCodigo: number;

    @Field(type => Int)
    @Column({ name: 'htr_tarcodigo' })
    htrTarcodigo: number;

    @Field(type => Int)
    @Column({ name: 'htr_usrcodigo' })
    htrUsrcodigo: number;

    @Field(type => Int)
    @Column({ name: 'htr_clhcodigo' })
    htrClhcodigo: number;

    @Field()
    @Column({ name: 'htr_data', type: 'date', nullable: true })
    htrData: string;

    @Field()
    @Column({ name: 'htr_tipo', length: 1, default: 'A' })
    htrTipo: string;

    @Field()
    @Column({ name: 'htr_horas', width: 2, default: 0 })
    htrHoras: number;

    @Field()
    @Column({ name: 'htr_minutos', width: 2, default: 0 })
    htrMinutos: number;

    @Field()
    @Column({ name: 'htr_descricao', nullable: true })
    htrDescricao: string;

    @Field()
    @Column({ name: 'htr_status', length: 1, default: 'A' })
    htrStatus: string;

    @ManyToOne(
        () => Tarefa,
        tarefa => tarefa.horatarefaConnection,
    )
    @JoinColumn({ name: 'htr_tarcodigo' })
    tarefaConnection: Promise<Tarefa>;

    @ManyToOne(
        () => Usuario,
        usuario => usuario.horatarefaConnection,
    )
    @JoinColumn({ name: 'htr_usrcodigo' })
    usuarioConnection: Promise<Usuario>;

    @ManyToOne(
        () => ClassificaHora,
        classificahora => classificahora.horatarefaConnection,
    )
    @JoinColumn({ name: 'htr_clhcodigo' })
    classificahoraConnection: Promise<ClassificaHora>;

    @OneToOne(
        () => HoraTarefaAut,
        horatarefaaut => horatarefaaut.horatarefaConnection,
    )
    horatarefaautConnection: Promise<HoraTarefa>;
}
