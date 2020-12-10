import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    ContatoCli,
    Endereco,
    Cep,
} from './db/entity/entities';

@Injectable()
class RepoService {
    public constructor(
        @InjectRepository(Setor) public readonly setorRepo: Repository<Setor>,
        @InjectRepository(Usuario) public readonly usuarioRepo: Repository<Usuario>,
        @InjectRepository(Tarefa) public readonly tarefaRepo: Repository<Tarefa>,
        @InjectRepository(HoraTarefa) public readonly horatarefaRepo: Repository<HoraTarefa>,
        @InjectRepository(ClassificaTar) public readonly classificaTarRepo: Repository<ClassificaTar>,
        @InjectRepository(ClassificaHora) public readonly classificaHoraRepo: Repository<ClassificaHora>,
        @InjectRepository(ObservacaoTar) public readonly observacaotarRepo: Repository<ObservacaoTar>,
        @InjectRepository(HoraTarefaAut) public readonly horatarefaautRepo: Repository<HoraTarefaAut>,
        @InjectRepository(Cliente) public readonly clienteRepo: Repository<Cliente>,
        @InjectRepository(GrupoCliente) public readonly grupoClienteRepo: Repository<GrupoCliente>,
        @InjectRepository(ContatoCli) public readonly contatoCliRepo: Repository<ContatoCli>,
        @InjectRepository(Endereco) public readonly enderecoRepo: Repository<Endereco>,
        @InjectRepository(Cep) public readonly cepRepo: Repository<Cep>,
    ) {}
}

export default RepoService;
