import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassificaHoraInput } from 'src/resolvers/input/input';
import RepoService from 'src/repo.service';
import { ClassificaHora, Setor } from 'src/db/entity/entities';

@Resolver(() => ClassificaHora)
class ClassificaHoraResolver {
    constructor(private readonly repoService: RepoService) {}

    @Query(() => [ClassificaHora])
    public async allClassificaHora(): Promise<ClassificaHora[]> {
        return this.repoService.classificaHoraRepo.find();
    }

    @Query(() => [ClassificaHora])
    public async buscaClassificaHora(@Args('campo') campo: string, @Args('valorCampo') valorCampo: string): Promise<ClassificaHora[]> {
        let isNumerico: boolean;
        campo.toUpperCase().includes('CODIGO') ? (isNumerico = true) : (isNumerico = false);
        if (isNumerico) {
            const campoCorreto = 'clh_' + campo.toLowerCase();
            const valorCorreto = Number(valorCampo);
            return this.repoService.classificaHoraRepo
                .createQueryBuilder('ClassificaHora')
                .where(`${campoCorreto} = ${valorCorreto}`)
                .getMany();
        } else {
            const campoCorreto = 'clh_' + campo.toLowerCase();
            return this.repoService.classificaHoraRepo
                .createQueryBuilder('ClassificaHora')
                .where(`${campoCorreto} like "%${valorCampo}%"`)
                .getMany();
        }
    }

    @Mutation(() => ClassificaHora)
    public async insereClassificaHora(@Args('data') input: ClassificaHoraInput): Promise<ClassificaHora> {
        const buscaUltimoCodigo = await this.repoService.classificaHoraRepo.createQueryBuilder('ClassificaHora').select('MAX(clh_codigo)', 'max');
        const result = await buscaUltimoCodigo.getRawOne();
        let ultimoCodigo = result.max;
        if (ultimoCodigo === null) {
            ultimoCodigo = 0;
        }
        const buscaDesc = await this.repoService.classificaHoraRepo.find({
            clhDescricao: input.clhDescricao,
            clhStrcodigo: input.clhStrcodigo,
        });
        const existeDesc = JSON.stringify(buscaDesc);
        if (existeDesc !== '[]') {
            const err = 'Descrição já cadastrada para esse Setor';
            throw new Error(err);
        }
        const novaClassificacao = new ClassificaHora();
        novaClassificacao.clhCodigo = ultimoCodigo + 1;
        novaClassificacao.clhDescricao = input.clhDescricao;
        novaClassificacao.clhStrcodigo = input.clhStrcodigo;
        console.log(novaClassificacao);
        return this.repoService.classificaHoraRepo.save(novaClassificacao);
    }

    @ResolveField(() => Setor, { name: 'setor' })
    public async getSetor(@Parent() parent: ClassificaHora): Promise<Setor> {
        return this.repoService.setorRepo.findOne({
            where: {
                strCodigo: parent.clhStrcodigo,
            },
        });
    }
}

export default ClassificaHoraResolver;
