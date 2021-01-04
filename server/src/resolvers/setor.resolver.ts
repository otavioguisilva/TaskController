import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Setor } from 'src/db/entity/entities';
import SetorInput from 'src/resolvers/input/setor.input';
import RepoService from 'src/repo.service';
import { Like } from 'typeorm';

@Resolver()
class SetorResolver {
    constructor(private readonly repoService: RepoService) {}
    /*Antes tinha mais de uma query pra buscar os setores porém achei que
    seria mais fácil no front end eu decidir conforme o campo selecionado
    então mudei para que entenda qual campo está vindo e se for númerico
    ele vai transformar o campo.
    PS:Pode ser reaproveitado
    */
    @Query(() => [Setor])
    public async buscaSetores(
        @Args('campo') campo: string,
        @Args('valorCampo') valorCampo: string,
    ): Promise<Setor[]> {
        if (campo.toUpperCase() == 'CODIGO') {
            const codigoConsulta = Number(valorCampo);
            return this.repoService.setorRepo.find({
                strCodigo: codigoConsulta,
            });
        } else {
            return this.repoService.setorRepo.find({
                strDescricao: Like(`%${valorCampo}%`),
            });
        }
    }

    @Query(() => [Setor])
    public async allSetores(): Promise<Setor[]> {
        return this.repoService.setorRepo.find();
    }

    @Mutation(() => Setor)
    public async insereSetor(@Args('data') input: SetorInput): Promise<Setor> {
        //Busca Ultimo Codigo Cadastrado(PODE SER ADAPTADO PRA QUALQUER TABELA NECESSÁRIA)
        const queryUltimoCodigo: any = await this.repoService.setorRepo.query(
            `SELECT MAX(str_codigo) from setor`,
        );
        const resultUltimoCodigo: string = JSON.stringify(Object.values(queryUltimoCodigo[0]));
        const regExp = /[0-9]/;
        let stringUltimoCodigo = '';
        for (let i = 0; i < resultUltimoCodigo.length; i++) {
            const isNumero = resultUltimoCodigo[i];
            if (isNumero.match(regExp)) {
                stringUltimoCodigo = stringUltimoCodigo + isNumero;
            }
        }
        const ultimoCodigo = Number(stringUltimoCodigo);
        //VERIFICA SE JÁ EXISTE SETOR COM ESSA DESCRIÇÃO CADASTRADO
        const existeSetor = await this.repoService.setorRepo.find({
            strDescricao: input.strDesc,
        });
        if (JSON.stringify(existeSetor) !== '[]') {
            const err = 'Setor Já Cadastrado';
            throw new Error(err);
        }
        const novoSetor = new Setor();
        novoSetor.strCodigo = ultimoCodigo + 1;
        novoSetor.strDescricao = input.strDesc.toUpperCase();
        return await this.repoService.setorRepo.save(novoSetor);
    }
}
export default SetorResolver;
