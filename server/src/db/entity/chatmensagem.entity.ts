import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field,  Int,  ObjectType } from '@nestjs/graphql';
import { Chat, Usuario } from './entities';

@ObjectType()
@Entity({name: 'chatmensagem'})
export default class ChatMensagem {
    @Field()
    @PrimaryGeneratedColumn({type:'int', name: 'chm_codigo' })
    chmCodigo: number;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(type => Int)
    @Column({ name: 'chm_chacodigo' })
    chmChaCodigo: number;

    @Field(type => Int)
    @Column({ name: 'chm_usrcodigorem' })
    chmUsrCodigoRem: number;

    @Field(type => Int)
    @Column({ name: 'chm_usrcodigodes' })
    chmUsrCodigoDes: number;

    @Field({ nullable: true })
    @Column({ name: 'chm_data', type: 'date', nullable: true })
    chmData: string;

    @Field({ nullable: true })
    @Column({ name: 'chm_hora', type: 'time', nullable: true })
    chmHora: string;

    @Field()
    @Column({ name: 'chm_mensagem', type: 'longtext' })
    chmMensagem: string;

    @ManyToOne(
        () => Chat,
        chat => chat.chatMensagemConnection
    )
    @JoinColumn({ name: 'chm_chacodigo' })
    chatConnection: Promise<Chat>;

    @ManyToOne(
        () => Usuario,
        usuario => usuario.chatMensagemRemConnection,
    )
    @JoinColumn({ name: 'chm_usrcodigorem' })
    usuarioRemConnection: Promise<Usuario>;

    @ManyToOne(
        () => Usuario,
        usuario => usuario.chatMensagemDesConnection,
    )
    @JoinColumn({ name: 'chm_usrcodigodes' })
    usuarioDesConnection: Promise<Usuario>;
}
