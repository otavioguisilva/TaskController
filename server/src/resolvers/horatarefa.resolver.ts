import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Tarefa, ClassificaHora, HoraTarefa } from 'src/db/entity/entities';
import { HoraTarefaInput } from 'src/resolvers/input/input';
import RepoService from 'src/repo.service';

@Resolver(() => HoraTarefa)
class HoraTarefaResolver {
    constructor(private readonly repoService: RepoService) {}

    @Query(() => HoraTarefa)
    public async getHorasTarefa(@Args('tarefa') tarefa: number): Promise<HoraTarefa[]> {
        return this.repoService.horatarefaRepo.find({
            where: {
                htrTarcodigo: tarefa,
            },
        });
    }

    @Query(() => HoraTarefa)
    public async getHora(@Args('horacodigo') horacodigo: number): Promise<HoraTarefa> {
        return this.repoService.horatarefaRepo.findOne({
            where: {
                htrCodigo: horacodigo,
            },
        });
    }

    @Mutation(() => HoraTarefa)
    public async InsereHoraManual(@Args('data') input: HoraTarefaInput): Promise<HoraTarefa> {
        const novaHora = new HoraTarefa();
        novaHora.htrTarcodigo = input.htrTarcodigo;
        novaHora.htrUsrcodigo = input.htrUsrcodigo;
        novaHora.htrClhcodigo = input.htrClhcodigo;
        novaHora.htrData = input.htrData;
        novaHora.htrTipo = 'M';
        novaHora.htrHoras = input.htrHoras;
        novaHora.htrMinutos = input.htrMinutos;
        novaHora.htrDescricao = input.htrDescricao;
        novaHora.htrStatus = 'F';
        return this.repoService.horatarefaRepo.save(novaHora);
    }

    @Mutation(() => HoraTarefa)
    public async IniciaHoraAuto(@Args('data') input: HoraTarefaInput): Promise<HoraTarefa> {
        const novaHora = await this.repoService.horatarefaRepo
            .createQueryBuilder('HoraTarefa')
            .insert()
            .into('horatarefa')
            .values({
                htrTarcodigo: input.htrTarcodigo,
                htrUsrcodigo: input.htrUsrcodigo,
                htrClhcodigo: input.htrClhcodigo,
                htrData: () => 'CURRENT_DATE',
                htrDescricao: input.htrDescricao,
            })
            .execute();

        const resultado = novaHora.generatedMaps[0];
        await this.repoService.horatarefaautRepo
            .createQueryBuilder('HoraTarefaAut')
            .insert()
            .values({
                htaHtrCodigo: resultado.htrCodigo,
                htaDtHrIni: () => 'CURRENT_TIMESTAMP',
            })
            .execute();
        return this.repoService.horatarefaRepo.findOne(resultado);
    }

    @Mutation(() => HoraTarefa)
    public async finalizaHoraAuto(@Args('data') input: HoraTarefaInput): Promise<HoraTarefa> {
        const buscaHora = await this.repoService.horatarefaRepo
            .createQueryBuilder('Hora')
            .select('htr_codigo')
            .where(`htr_usrcodigo = ${input.htrUsrcodigo} and htr_tipo = 'A' and htr_status = 'A' and htr_tarcodigo = ${input.htrTarcodigo}`)
            .execute();
        //VERIFICA SE EXISTE ALGUMA HORA EM ABERTO
        console.log(buscaHora);
        if (JSON.stringify(buscaHora) === '[]') {
            console.log('ok');
            const err = 'Não Existe Tarefa Automática em Aberto';
            throw new Error(err);
        } else {
            const resultBuscaHora: any = Object.values(buscaHora[0]);
            const horaCodigo = resultBuscaHora.toString();
            await this.repoService.horatarefaautRepo
                .createQueryBuilder()
                .update('horatarefaaut')
                .set({
                    htaDtHrFim: () => 'CURRENT_TIMESTAMP',
                })
                .where(`hta_htrcodigo = ${horaCodigo} and hta_dthrfim is null`)
                .execute();
            const buscaHrMn = await this.repoService.horatarefaautRepo
                .createQueryBuilder('buscahoramin')
                .select('SEC_TO_TIME(UNIX_TIMESTAMP(hta_dthrfim) - UNIX_TIMESTAMP(hta_dthrini))')
                .where(`hta_htrCodigo = ${horaCodigo}`)
                .execute();
            const resultBuscaHrMn: any = Object.values(buscaHrMn[0]);
            const split: any = resultBuscaHrMn.toString().split(':', 2);
            const valorHora = split[0];
            const valorMinuto = split[1];
            await this.repoService.horatarefaRepo
                .createQueryBuilder('finalizahora')
                .update('horatarefa')
                .set({
                    htrHoras: valorHora,
                    htrMinutos: valorMinuto,
                    htrStatus: 'F',
                })
                .where(`htr_tarcodigo = ${input.htrTarcodigo} and htr_usrcodigo = ${input.htrUsrcodigo}`)
                .execute();
            return this.repoService.horatarefaRepo.findOne({
                where: {
                    htrTarcodigo: input.htrTarcodigo,
                    htrUsrcodigo: input.htrUsrcodigo,
                },
            });
        }
    }

    @ResolveField(() => ClassificaHora)
    public async getClassificacao(@Parent() parent: HoraTarefa): Promise<ClassificaHora> {
        return this.repoService.classificaHoraRepo.findOne({
            where: {
                clhCodigo: parent.htrClhcodigo,
            },
        });
    }

    @ResolveField(() => Tarefa)
    public async getTarefa(@Parent() parent: HoraTarefa): Promise<Tarefa> {
        return this.repoService.tarefaRepo.findOne({
            where: {
                tarCodigo: parent.htrTarcodigo,
            },
        });
    }
}

export default HoraTarefaResolver;
