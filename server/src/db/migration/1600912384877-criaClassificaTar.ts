import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaClassificaTar1600912384877 implements MigrationInterface {
    public tabelaClassificaTar = new Table({
        name: 'classificatar',
        columns: [
            {
                name: 'clt_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: false,
                isUnique: true,
            },
            {
                name: 'clt_descricao',
                type: 'varchar',
                length: '50',
                isPrimary: true,
            },
            {
                name: 'clt_strcodigo',
                type: 'int',
                isPrimary: true,
            },
        ],
    });

    public foreignKeyCltStr = new TableForeignKey({
        columnNames: ['clt_strcodigo'],
        referencedColumnNames: ['str_codigo'],
        referencedTableName: 'setor',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaClassificaTar);
        await queryRunner.createForeignKey(this.tabelaClassificaTar, this.foreignKeyCltStr);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaClassificaTar);
    }
}
