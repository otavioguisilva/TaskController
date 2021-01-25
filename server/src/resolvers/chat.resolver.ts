import { Args, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/repo.service';
import { ChatInput } from 'src/resolvers/input/input';
import { Chat } from 'src/db/entity/entities';

@Resolver(() => Chat)
class ChatResolver{
    constructor(private readonly repoService: RepoService) {}

    @Query(() => [Chat])
    public async allChat(): Promise<Chat[]> {
        return this.repoService.chatRepo.find();
    }

    @Query(() => Chat)
    public async getChat(@Args('id') id: number ): Promise<Chat> {
        return this.repoService.chatRepo.findOne(id)
    }

    @Mutation(() => Chat)
    public async createChat(@Args('data') input: ChatInput) : Promise<Chat> {
        const novoChat = new Chat();
        //VAI RECEBER OS USUARIOS E ORGANIZAR EM ORDEM CRESCENTE PARA VERIFICAR NO BANCO
        const valorUsuarios = () => {
            const valInput:Array<any> = input.chaUsuarios.split(',');
            valInput.forEach((value, index) => {
                valInput[index] = Number(value)
            });
            valInput.sort((a, b) => a - b);
            return valInput.toString();
        };
        const chaUsuariosOrdered = valorUsuarios();
        //VERIFICA SE JÁ EXISTE UM CHAT ENTRE ESSES USUARIOS
        const chatExists = await this.repoService.chatRepo.findOne({
            where: {
                chaUsuarios: chaUsuariosOrdered
            }
        });
        if (chatExists === undefined) {
            novoChat.chaUsuarios = chaUsuariosOrdered;
            return await this.repoService.chatRepo.save(novoChat);        
        }
        return chatExists;
    }

}

export default ChatResolver