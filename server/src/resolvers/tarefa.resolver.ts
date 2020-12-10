import { Args, Mutation, Query, Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { ClassificaTar, Tarefa, Usuario } from 'src/db/entity/entities';
import { ClassificaTarInput, TarefaInput } from 'src/resolvers/input/input';
import RepoService from 'src/repo.service';
import { createQueryBuilder, DeepPartial, Like } from 'typeorm';

@Resolver(() => Tarefa)
class TarefaResolver {
    constructor(private readonly repoService: RepoService) {}

    @Mutation(() => Tarefa)
    public async insereTarefa(@Args('data') input: TarefaInput): Promise<Tarefa> {
        const novaTarefa = await this.repoService.tarefaRepo
            .createQueryBuilder('Tarefa')
            .insert()
            .into('tarefa')
            .values({
                tarTitulo: input.tarTitulo,
                tarDescricao: input.tarDescricao,
                tarCltcodigo: input.tarCltcodigo,
                tarDtHrAbert: () => 'CURRENT_TIMESTAMP',
                tarUsrcodigo: input.tarUsrcodigo,
            })
            .execute();

        const resultado = novaTarefa.generatedMaps[0];
        return this.repoService.tarefaRepo.findOne(resultado);
    }

    @Mutation(() => Tarefa)
    public async excutaTarefa(@Args('tarcodigo') tarcodigo: number): Promise<Tarefa> {
        const alteraTar = await this.repoService.tarefaRepo
            .createQueryBuilder()
            .update('tarefa')
            .set({
                tarStatus: 'F',
                tarDtHrFecha: () => 'CURRENT_TIMESTAMP',
            })
            .where(`tar_codigo = ${tarcodigo}`)
            .execute();
        const resultado = alteraTar.generatedMaps[0];
        return this.repoService.tarefaRepo.findOne(resultado);
    }

    @ResolveField(() => ClassificaTar)
    public async getClassificacao(@Parent() parent: Tarefa): Promise<ClassificaTar> {
        return this.repoService.classificaTarRepo.findOne({
            where: {
                cltCodigo: parent.tarCltcodigo,
            },
        });
    }

    @ResolveField(() => Usuario)
    public async getUsuario(@Parent() parent: Tarefa): Promise<Usuario> {
        return this.repoService.usuarioRepo.findOne({
            where: {
                usrCodigo: parent.tarUsrcodigo,
            },
        });
    }
}

export default TarefaResolver;
