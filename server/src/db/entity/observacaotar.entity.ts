import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Tarefa from './tarefa.entity';
import Usuario from './usuario.entity';

@ObjectType()
@Entity({ name: 'observacaotar' })
export default class ObservacaoTar {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'obt_codigo' })
    obtCodigo: number;

    @Field(type => Int)
    @Column({ name: 'obt_tarcodigo' })
    obtTarcodigo: number;

    @Field(type => Int)
    @Column({ name: 'obt_usrcodigo' })
    obtUsrcodigo: number;

    @Field()
    @Column({ name: 'obt_datahora', type: 'datetime' })
    obtDatahora: Date;

    @Field()
    @Column({ name: 'obt_observacao', type: 'longtext' })
    obtObservacao: string;

    @ManyToOne(
        () => Tarefa,
        tarefa => tarefa.observacaotarConnection,
    )
    @JoinColumn({ name: 'obt_tarcodigo' })
    tarefaConnection: Promise<Tarefa>;

    @ManyToOne(
        () => Usuario,
        usuario => usuario.observacaotarConnection,
    )
    @JoinColumn({ name: 'obt_usrcodigo' })
    usuarioConnection: Promise<Usuario>;
}
