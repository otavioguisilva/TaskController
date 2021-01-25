import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field,  ObjectType } from '@nestjs/graphql';
import { ChatMensagem } from './entities';

@ObjectType()
@Entity({name: 'chat'})
export default class Chat {
    @Field()
    @PrimaryGeneratedColumn({type:'int', name: 'cha_codigo' })
    chaCodigo: number;

    @Field()
    @Column('varchar', { name: 'cha_usuarios', length: 255 })
    chaUsuarios: string;

    @OneToMany(
        () => ChatMensagem,
        chatMensagem => chatMensagem.chatConnection,
    )
    chatMensagemConnection: Promise<Chat[]>
}
