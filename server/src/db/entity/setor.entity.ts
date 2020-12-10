import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import ClassificaHora from './classificahora.entity';
import ClassificaTar from './classificatar.entity';
import Usuario from './usuario.entity';

@ObjectType()
@Entity({ name: 'setor' })
export default class Setor {
  @Field(type => Int)
  @PrimaryColumn({ name: 'str_codigo' })
  strCodigo: Number;

  @Field()
  @PrimaryColumn({ name: 'str_descricao', length: 50 })
  strDescricao: string;

  //Associações
  @OneToMany(
    () => Usuario,
    usuario => usuario.setorConnection,
  )
  usuarioConnection: Promise<Usuario[]>;

  @OneToMany(
    () => ClassificaTar,
    classificatar => classificatar.setorConnection,
  )
  classificatarConnection: Promise<ClassificaTar[]>;

  @OneToMany(
    () => ClassificaHora,
    classificahora => classificahora.setorConnection,
  )
  classificahoraConnection: Promise<ClassificaHora[]>;
}
