import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Setor,
    Usuario,
    Tarefa,
    HoraTarefa,
    ClassificaTar,
    ClassificaHora,
    ObservacaoTar,
    HoraTarefaAut,
    Cliente,
    GrupoCliente,
    Endereco,
    ContatoCli,
    Cep,
    Chat,
    ChatMensagem
} from './db/entity/entities';
import RepoService from './repo.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Setor,
            Usuario,
            Tarefa,
            HoraTarefa,
            ClassificaTar,
            ClassificaHora,
            ObservacaoTar,
            HoraTarefaAut,
            Cliente,
            GrupoCliente,
            ContatoCli,
            Endereco,
            Cep,
            Chat,
            ChatMensagem,
        ]),
    ],
    providers: [RepoService],
    exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
