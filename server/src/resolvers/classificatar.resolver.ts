import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import { ClassificaTarInput } from 'src/resolvers/input/input';
import { ClassificaTar, Setor } from 'src/db/entity/entities';

@Resolver(() => ClassificaTar)
class ClassificaTarResolver {
    constructor(private readonly repoService: RepoService) {}

    @Query(() => [ClassificaTar])
    public async allClassificaTar(): Promise<ClassificaTar[]> {
        return this.repoService.classificaTarRepo.find();
    }

    @Query(() => [ClassificaTar])
    public async buscaClassificaTar(
        @Args('campo') campo: string,
        @Args('valorCampo') valorCampo: string,
    ): Promise<ClassificaTar[]> {
        let isNumerico: boolean;
        campo.toUpperCase().includes('CODIGO') ? (isNumerico = true) : (isNumerico = false);
        if (isNumerico) {
            const campoCorreto = 'clt_' + campo.toLowerCase();
            const valorCorreto = Number(valorCampo);
            return this.repoService.classificaTarRepo
                .createQueryBuilder('ClassificaTar')
                .where(`${campoCorreto} = ${valorCorreto}`)
                .getMany();
        } else {
            const campoCorreto = 'clt_' + campo.toLowerCase();
            return this.repoService.classificaTarRepo
                .createQueryBuilder('ClassificaTar')
                .where(`${campoCorreto} like "%${valorCampo}%"`)
                .getMany();
        }
    }

    @Mutation(() => ClassificaTar)
    public async insereClassificaTar(
        @Args('data') input: ClassificaTarInput,
    ): Promise<ClassificaTar> {
        const buscaUltimoCodigo = await this.repoService.classificaTarRepo
            .createQueryBuilder('ClassificaTar')
            .select('MAX(clt_codigo)', 'max');
        const result = await buscaUltimoCodigo.getRawOne();
        let ultimoCodigo = result.max;
        if (ultimoCodigo === null) {
            ultimoCodigo = 0;
        }
        const buscaDesc = await this.repoService.classificaTarRepo.find({
            cltDescricao: input.cltDescricao,
            cltStrcodigo: input.cltStrcodigo,
        });
        const existeDesc = JSON.stringify(buscaDesc);
        if (existeDesc !== '[]') {
            const err = 'Descrição já cadastrada para esse Setor';
            throw new Error(err);
        }
        const novaClassificacao = new ClassificaTar();
        novaClassificacao.cltCodigo = ultimoCodigo + 1;
        novaClassificacao.cltDescricao = input.cltDescricao;
        novaClassificacao.cltStrcodigo = input.cltStrcodigo;
        console.log(novaClassificacao);
        return this.repoService.classificaTarRepo.save(novaClassificacao);
    }

    @ResolveField(() => Setor, { name: 'setor' })
    public async getSetor(@Parent() parent: ClassificaTar): Promise<Setor> {
        return this.repoService.setorRepo.findOne({
            where: {
                strCodigo: parent.cltStrcodigo,
            },
        });
    }
}

export default ClassificaTarResolver;
