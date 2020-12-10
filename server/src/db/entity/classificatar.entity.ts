import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import Setor from './setor.entity';
import Tarefa from './tarefa.entity';

@ObjectType()
@Entity({ name: 'classificatar' })
export default class ClassificaTar {
  @Field(type => Int)
  @PrimaryColumn({ name: 'clt_codigo' })
  cltCodigo: number;

  @Field()
  @PrimaryColumn({ name: 'clt_descricao', length: 50 })
  cltDescricao: string;

  @Field(type => Int)
  @PrimaryColumn({ name: 'clt_strcodigo' })
  cltStrcodigo: number;

  //Associações

  @ManyToOne(
    () => Setor,
    setor => setor.classificatarConnection,
  )
  @JoinColumn({ name: 'clt_strcodigo' })
  setorConnection: Promise<Setor>;

  @OneToMany(
    () => Tarefa,
    tarefa => tarefa.classificatarConnection,
  )
  tarefaConnection: Promise<Tarefa[]>;
}
