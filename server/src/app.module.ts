import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import RepoModule from './repo.module';
import * as ormOptions from './config/orm';
import {
    SetorResolver,
    ObservacaoTarResolver,
    HoraTarefaResolver,
    UsuarioResolver,
    TarefaResolver,
    ClassificaTarResolver,
    ClassificaHoraResolver,
} from './resolvers/resolvers';

const gqlImports = [
    SetorResolver,
    UsuarioResolver,
    ClassificaTarResolver,
    ClassificaHoraResolver,
    HoraTarefaResolver,
    ObservacaoTarResolver,
    TarefaResolver,
];

@Module({
    imports: [
        TypeOrmModule.forRoot(ormOptions),
        RepoModule,
        ...gqlImports,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            playground: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
