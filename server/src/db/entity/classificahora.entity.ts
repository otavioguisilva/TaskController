import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import HoraTarefa from './horatarefa.entity';
import Setor from './setor.entity';

@ObjectType()
@Entity({ name: 'classificahora' })
export default class ClassificaHora {
  @Field(type => Int)
  @PrimaryColumn({ name: 'clh_codigo' })
  clhCodigo: number;

  @Field()
  @PrimaryColumn({ name: 'clh_descricao', length: 50 })
  clhDescricao: string;

  @Field()
  @PrimaryColumn({ name: 'clh_strcodigo' })
  clhStrcodigo: number;

  //Associações

  @ManyToOne(
    () => Setor,
    setor => setor.classificahoraConnection,
  )
  @JoinColumn({ name: 'clh_strcodigo' })
  setorConnection: Promise<Setor>;

  @OneToMany(
    () => HoraTarefa,
    horatarefa => horatarefa.classificahoraConnection,
  )
  horatarefaConnection: Promise<HoraTarefa[]>;
}
