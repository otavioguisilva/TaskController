import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { UploadController } from './upload.controller';
import { UploadModule } from './upload.module';

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
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            playground: true,
        }),
        UploadModule,
    ],
    controllers: [AppController, UploadController],
    providers: [AppService],
})
export class AppModule {}
