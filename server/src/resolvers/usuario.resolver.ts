import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Usuario, Setor } from 'src/db/entity/entities';
import { UsuarioInput } from 'src/resolvers/input/input';
import RepoService from 'src/repo.service';
import encryptaSenha from 'src/components/encryptasenha';

@Resolver(() => Usuario)
class UsuarioResolver {
    constructor(private readonly repoService: RepoService) {}

    @Mutation(() => Usuario, { nullable: true })
    public async loginUsuario(@Args('loginOrEmail') loginOrEmail: string, @Args('senha') senha: string): Promise<Usuario> {
        // VERIFICA SE O CAMPO INFORMADO É EMAIL OU LOGIN VERIFICANDO SE POSSUI @
        let emailOrLogin;
        loginOrEmail.includes('@') ? (emailOrLogin = 'Email') : (emailOrLogin = 'Login');
        let getUser;
        if (senha.length === 0) {
            throw new Error('Digite uma Senha');
        }
        //CASO FOR EMAIL VAI BUSCAR SE TEM USUÁRIO COM O EMAIL OU LOGIN SE NÃO ENCONTRAR RETORNA UM ERRO
        if (emailOrLogin === 'Email') {
            getUser = await this.repoService.usuarioRepo.findOne({
                usrEmail: loginOrEmail,
            });
            if (!getUser) throw new Error('Email não encontrado');
        } else {
            const usuarioM = loginOrEmail.toUpperCase();
            getUser = await this.repoService.usuarioRepo.findOne({
                usrLogin: usuarioM,
            });
            if (!getUser) throw new Error('Usuário não encontrado');
        }
        //PEGA AS INFORMAÇÕES DE LOGIN E SENHA DO USUARIO PEGO ANTERIORMENTE
        let loginUsr = await getUser.usrLogin;
        let senhaUsr = await getUser.usrSenha;
        let senhaEncrypt = encryptaSenha(senha, loginUsr);
        if (senhaEncrypt === senhaUsr) {
            return await this.repoService.usuarioRepo.findOne({
                where: {
                    usrLogin: loginUsr,
                    usrSenha: senhaUsr,
                },
            });
        } else {
            throw new Error('Senha inválida');
        }
    }

    @Query(() => [Usuario])
    public async allUsuarios(): Promise<Usuario[]> {
        return this.repoService.usuarioRepo.find();
    }

    @Query(() => Usuario)
    public async getFotoUsuario(@Args('usrId') usrId: number): Promise<Usuario> {
        return this.repoService.usuarioRepo.findOne({
            select: ['usrCaminhoFoto'],
            where: {
                usrCodigo: usrId,
            },
        });
    }

    @Mutation(() => Usuario)
    public async alteraFotoUsuario(@Args('caminhoFoto') caminhoFoto: string, @Args('usrId') usrId: number): Promise<Usuario> {
        const caminhoFinalFoto = `../../fotos/perfil/${caminhoFoto}`;
        const alteraFoto = await this.repoService.usuarioRepo
            .createQueryBuilder('AlteraFoto')
            .update('usuario')
            .set({ usrCaminhoFoto: caminhoFinalFoto })
            .where(`usr_codigo = ${usrId}`)
            .execute();
        const resultado = alteraFoto.generatedMaps[0];
        return this.repoService.usuarioRepo.findOne(resultado);
    }

    //PARA NÃO CRIAR UMA BUSCA POR ID E OUTRA NORMAL CRIEI ESSE METODO QUE SE ADAPTA AO QUE O FRONT-END MANDAR
    @Query(() => [Usuario])
    public async buscaUsuario(@Args('campo') campo: string, @Args('valorCampo') valorCampo: string): Promise<Usuario[]> {
        let isNumerico: boolean;
        campo.toUpperCase().includes('CODIGO') ? (isNumerico = true) : (isNumerico = false);
        if (isNumerico) {
            let campoCorreto = 'usr_' + campo.toLowerCase();
            let valorCorreto = Number(valorCampo);
            return this.repoService.usuarioRepo
                .createQueryBuilder('Usuario')
                .where(`${campoCorreto} = ${valorCorreto}`)
                .getMany();
        } else {
            let campoCorreto = 'usr_' + campo.toLowerCase();
            return this.repoService.usuarioRepo
                .createQueryBuilder('Usuario')
                .where(`${campoCorreto} like "%${valorCampo}%"`)
                .getMany();
        }
    }

    @Mutation(() => Usuario)
    public async insereUsuario(@Args('datas') input: UsuarioInput): Promise<Usuario> {
        //VERIFICA SE JÁ EXISTE USUARIO COM ESSE LOGIN CADASTRADO
        let buscaLogin = await this.repoService.usuarioRepo.find({
            usrLogin: input.usrLogin,
        });
        let existeLogin = JSON.stringify(buscaLogin);
        if (existeLogin !== '[]') {
            let err = 'Login já existente';
            throw new Error(err);
        }
        //VERIFICA SE JÁ EXISTE EMAIL CADASTRADO
        let buscaEmail = await this.repoService.usuarioRepo.find({
            usrEmail: input.usrEmail,
        });
        let existeEmail = JSON.stringify(buscaEmail);
        if (existeEmail !== '[]') {
            let err = 'Email já cadastrado para outro usuário';
            throw new Error(err);
        }
        let novoUsuario = new Usuario();
        novoUsuario.usrEmail = input.usrEmail.toLowerCase().trim();
        novoUsuario.usrLogin = input.usrLogin.toUpperCase().trim();
        novoUsuario.usrNomecompleto = input.usrNomecompleto;
        novoUsuario.usrSenha = encryptaSenha(input.usrSenha, novoUsuario.usrLogin);
        novoUsuario.usrStrcodigo = input.usrStrCodigo;
        novoUsuario.usrDtnascimento = input.usrDtnascimento;
        return this.repoService.usuarioRepo.save(novoUsuario);
    }

    @ResolveField(() => Setor, { name: 'setor' })
    public async getSetor(@Parent() parent: Usuario): Promise<Setor> {
        return this.repoService.setorRepo.findOne({
            where: {
                strCodigo: parent.usrStrcodigo,
            },
        });
    }
}

export default UsuarioResolver;
