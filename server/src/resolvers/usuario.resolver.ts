import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Usuario, Setor } from 'src/db/entity/entities';
import { UsuarioInput } from 'src/resolvers/input/input';
import RepoService from 'src/repo.service';
import encryptaSenha from 'src/components/encryptasenha';
import { PubSub } from 'graphql-subscriptions'

export const pubSub = new PubSub ()

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
        const loginUsr = await getUser.usrLogin;
        const senhaUsr = await getUser.usrSenha;
        const senhaEncrypt = encryptaSenha(senha, loginUsr);
        if (senhaEncrypt === senhaUsr) {
            const usuario = await this.repoService.usuarioRepo.findOne({
                where: {
                    usrLogin: loginUsr,
                    usrSenha: senhaUsr,
                },
            })
            usuario.usrCaminhoFoto = Buffer.from(usuario.usrCaminhoFoto).toString();
            return usuario;
            ;
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
        const usuario = await this.repoService.usuarioRepo.findOne({
            select: ['usrCaminhoFoto'],
            where: {
                usrCodigo: usrId,
            },
        });
        usuario.usrCaminhoFoto = Buffer.from(usuario.usrCaminhoFoto).toString('base64');
        return usuario;
    }

    @Mutation(() => Usuario)
    public async alteraFotoUsuario(@Args('caminhoFoto') caminhoFoto: string, @Args('usrId') usrId: number): Promise<Usuario> {
        const alteraFoto = await this.repoService.usuarioRepo
            .createQueryBuilder('AlteraFoto')
            .update('usuario')
            .set({ usrCaminhoFoto: caminhoFoto })
            .where(`usr_codigo = ${usrId}`)
            .execute();
        const resultado = alteraFoto.generatedMaps[0];
        const novaFoto = await this.repoService.usuarioRepo.findOne(resultado);
        novaFoto.usrCaminhoFoto = Buffer.from(novaFoto.usrCaminhoFoto).toString('base64');
        pubSub.publish('caminhoAlterado', { caminhoAlterado: novaFoto})
        return novaFoto;
    }

    //PARA NÃO CRIAR UMA BUSCA POR ID E OUTRA NORMAL CRIEI ESSE METODO QUE SE ADAPTA AO QUE O FRONT-END MANDAR
    @Query(() => [Usuario])
    public async buscaUsuario(@Args('campo') campo: string, @Args('valorCampo') valorCampo: string): Promise<Usuario[]> {
        let isNumerico: boolean;
        campo.toUpperCase().includes('CODIGO') ? (isNumerico = true) : (isNumerico = false);
        if (isNumerico) {
            const campoCorreto = 'usr_' + campo.toLowerCase();
            const valorCorreto = Number(valorCampo);
            return this.repoService.usuarioRepo
                .createQueryBuilder('Usuario')
                .where(`${campoCorreto} = ${valorCorreto}`)
                .getMany();
        } else {
            const campoCorreto = 'usr_' + campo.toLowerCase();
            return this.repoService.usuarioRepo
                .createQueryBuilder('Usuario')
                .where(`${campoCorreto} like "%${valorCampo}%"`)
                .getMany();
        }
    }

    @Mutation(() => Usuario)
    public async insereUsuario(@Args('datas') input: UsuarioInput): Promise<Usuario> {
        //VERIFICA SE JÁ EXISTE USUARIO COM ESSE LOGIN CADASTRADO
        const buscaLogin = await this.repoService.usuarioRepo.find({
            usrLogin: input.usrLogin,
        });
        const existeLogin = JSON.stringify(buscaLogin);
        if (existeLogin !== '[]') {
            const err = 'Login já existente';
            throw new Error(err);
        }
        //VERIFICA SE JÁ EXISTE EMAIL CADASTRADO
        const buscaEmail = await this.repoService.usuarioRepo.find({
            usrEmail: input.usrEmail,
        });
        const existeEmail = JSON.stringify(buscaEmail);
        if (existeEmail !== '[]') {
            const err = 'Email já cadastrado para outro usuário';
            throw new Error(err);
        }
        const novoUsuario = new Usuario();
        novoUsuario.usrEmail = input.usrEmail.toLowerCase().trim();
        novoUsuario.usrLogin = input.usrLogin.toUpperCase().trim();
        novoUsuario.usrNomecompleto = input.usrNomecompleto;
        novoUsuario.usrSenha = encryptaSenha(input.usrSenha, novoUsuario.usrLogin);
        novoUsuario.usrStrcodigo = input.usrStrCodigo;
        novoUsuario.usrDtnascimento = input.usrDtnascimento;
        return this.repoService.usuarioRepo.save(novoUsuario);
    }
    
    @Subscription(() => Usuario)
    caminhoAlterado() {
        return pubSub.asyncIterator('caminhoAlterado')
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
