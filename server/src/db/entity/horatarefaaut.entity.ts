import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { HoraTarefa } from './entities';

@ObjectType()
@Entity({ name: 'horatarefaaut' })
export default class HoraTarefaAut {
    @Field(type => Int)
    @PrimaryGeneratedColumn({ name: 'hta_codigo' })
    htaCodigo: number;

    @Field(type => Int)
    @PrimaryColumn({ name: 'hta_htrcodigo' })
    htaHtrCodigo: number;

    @Field({ nullable: true, defaultValue: 'CURRENT_TIMESTAMP' })
    @Column({ name: 'hta_dthrini', type: 'timestamp' })
    htaDtHrIni: string;

    @Field({ nullable: true })
    @Column({ name: 'hta_dthrfim', type: 'timestamp', nullable: true })
    htaDtHrFim: string;

    //Associações

    @OneToOne(
        () => HoraTarefa,
        horatarefa => horatarefa.horatarefaautConnection,
    )
    @JoinColumn({ name: 'hta_htrcodigo' })
    horatarefaConnection: Promise<HoraTarefa>;
}
