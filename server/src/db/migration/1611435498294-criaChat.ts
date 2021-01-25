import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class criaChat1611435498294 implements MigrationInterface {

    private tabelaChat = new Table({
        name: 'chat',
        columns: [
            {
                name: 'cha_codigo',
                type: 'int',
                isPrimary:true,
                isGenerated:true,
                generationStrategy: 'increment'
            },
            {
                name: 'cha_usuarios',
                type: 'varchar',
                length: '255',
                isPrimary: true,
            }
        ]
    });

    private tabelaChatMensagem = new Table({
        name: 'chatmensagem',
        columns: [
            {
                name: 'chm_codigo',
                type: 'int',
                isPrimary:true,
                isGenerated:true,
                generationStrategy: 'increment'
            },
            {
                name: 'chm_chacodigo',
                type: 'int'
            },
            {
                name: 'chm_usrcodigorem',
                type: 'int',
            },
            {
                name: 'chm_usrcodigodes',
                type: 'int',
            },
            {
                name: 'chm_data',
                type: 'date',
            },
            {
                name: 'chm_hora',
                type: 'time',
            },
            {
                name: 'chm_mensagem',
                type: 'longtext',
            },
        ]
    });

    private foreignKeyChaChm = new TableForeignKey({
        columnNames: ['chm_chacodigo'],
        referencedColumnNames: ['cha_codigo'],
        referencedTableName: 'chat',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    private foreignKeyChmUsrRem = new TableForeignKey({
        columnNames: ['chm_usrcodigorem'],
        referencedColumnNames: ['usr_codigo'],
        referencedTableName: 'usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    private foreignKeyChmUsrDes = new TableForeignKey({
        columnNames: ['chm_usrcodigodes'],
        referencedColumnNames: ['usr_codigo'],
        referencedTableName: 'usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaChat);
        await queryRunner.createTable(this.tabelaChatMensagem);
        await queryRunner.createForeignKeys(this.tabelaChatMensagem, [this.foreignKeyChaChm, this.foreignKeyChmUsrRem, this.foreignKeyChmUsrDes]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tabelaChatMensagem);
        await queryRunner.dropTable(this.tabelaChat);
    }

}
