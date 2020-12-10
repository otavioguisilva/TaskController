import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaObservacaoTar1600967202536 implements MigrationInterface {
    private tabelaObservacaoTar = new Table({
        name: 'observacaotar',
        columns: [
            {
                name: 'obt_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'obt_tarcodigo',
                type: 'int',
            },
            {
                name: 'obt_usrcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'obt_datahora',
                type: 'datetime',
            },
            {
                name: 'obt_observacao',
                type: 'longtext',
            },
        ],
    });

    private foreignKeyObtTar = new TableForeignKey({
        columnNames: ['obt_tarcodigo'],
        referencedColumnNames: ['tar_codigo'],
        referencedTableName: 'tarefa',
    });

    private foreignKeyObtUsr = new TableForeignKey({
        columnNames: ['obt_usrcodigo'],
        referencedColumnNames: ['usr_codigo'],
        referencedTableName: 'usuario',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaObservacaoTar);
        await queryRunner.createForeignKeys(this.tabelaObservacaoTar, [this.foreignKeyObtTar, this.foreignKeyObtUsr]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaObservacaoTar);
    }
}
