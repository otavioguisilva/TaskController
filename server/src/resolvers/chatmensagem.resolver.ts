import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import { ChatInput, ChatMensagemInput } from 'src/resolvers/input/input';
import { Chat, ChatMensagem, Usuario } from 'src/db/entity/entities';
import { PubSub } from 'apollo-server-express';


const pubSub = new PubSub();

@Resolver(() => ChatMensagem)
class ChatMensagemResolver{
    constructor(private readonly repoService: RepoService) {}
    @Query(() => [ChatMensagem])
    public async allMessages(): Promise<ChatMensagem[]> {
        return this.repoService.chatMensagemRepo.find();
    }

    @Query(() => ChatMensagem)
    public async getMessage(@Args('id',{
        nullable: true
    }) id : number, 
    @Args('chaCodigo', {
        nullable: true
    }) chaCodigo: number, 
    @Args('usrCodigo', {
        nullable : true
    }) usrCodigo: number): Promise<ChatMensagem>{
        return this.repoService.chatMensagemRepo.findOne({
            where: [{
                chmCodigo: id
            },
            {
                chmChaCodigo: chaCodigo
            },
            {
                chmUsrCodigo: usrCodigo
            }
        ]
        })
    }

    @Mutation(() => ChatMensagem)
    public async newChatMessage(
        @Args('data') input : ChatMensagemInput,
        @Args('dataChat') inputChar : ChatInput ): Promise<ChatMensagem> {
        //VAI RECEBER OS USUARIOS E ORGANIZAR EM ORDEM CRESCENTE PARA VERIFICAR NO BANCO
        const valorUsuarios = () => {
            const valInput:Array<any> = inputChar.chaUsuarios.split(',');
            valInput.forEach((value, index) => {
                valInput[index] = Number(value)
            });
            valInput.sort((a, b) => a - b);
            return valInput.toString();
        };
        const chaUsuariosOrdered = valorUsuarios();
        //VERIFICA SE JÁ EXISTE UM CHAT ENTRE ESSES USUARIOS
        const buscaChaCodigo = async () => {
            const chatExists = await this.repoService.chatRepo.findOne({
                where: {
                    chaUsuarios: chaUsuariosOrdered
                }
            });
            if (chatExists === undefined) {
                const novoChat = new Chat()
                novoChat.chaUsuarios = chaUsuariosOrdered;
                const criaChat = await this.repoService.chatRepo.save(novoChat)
                return criaChat.chaCodigo;
            }
            return chatExists.chaCodigo;
        }
        const valorChaCodigo = await buscaChaCodigo();
        //CRIA A MENSAGEM
        const newMessage = await this.repoService.chatMensagemRepo.createQueryBuilder()
        .insert()
        .values({
            chmData: () => 'CURRENT_DATE',
            chmHora: () => 'CURRENT_TIME',
            chmChaCodigo: valorChaCodigo,
            chmUsrCodigoRem: input.chmUsrCodigoRem,
            chmUsrCodigoDes: input.chmUsrCodigoDes,
            chmMensagem: input.chmMensagem
        })
        .execute()
        const resultId = newMessage.generatedMaps[0];
        const result = await this.repoService.chatMensagemRepo.findOne(resultId);
        console.log(result);
        pubSub.publish('hearNewMessage', { hearNewMessage: result });
        return result 
    }

    @Subscription(() => ChatMensagem, {
        filter: (payload, variables) => 
        payload.hearNewMessage.chmUsrCodigoDes === variables.chmUsrCodigoDes
    })
    public async hearNewMessage(@Args('chmUsrCodigoDes') chmUsrCodigoDes: number){
        return pubSub.asyncIterator('hearNewMessage')
    }

    @ResolveField(() => Chat)
    public async Chat(@Parent() parent) : Promise<Chat> {
        return this.repoService.chatRepo.findOne(parent.chmChaCodigo);
    }

    @ResolveField(() => Usuario)
    public async Usuario(@Parent() parent) : Promise<Usuario> {
        return this.repoService.usuarioRepo.findOne(parent.chmUsrCodigo);
    }

}

export default ChatMensagemResolver