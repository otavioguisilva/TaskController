import { MigrationInterface, QueryRunner, Table, TableForeignKey, ColumnType } from 'typeorm';

export class criaClassificaHora1600912406591 implements MigrationInterface {
    public tabelaClassificaHora = new Table({
        name: 'classificahora',
        columns: [
            {
                name: 'clh_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: false,
                isUnique: true,
            },
            {
                name: 'clh_descricao',
                type: 'varchar',
                length: '50',
                isPrimary: true,
            },
            {
                name: 'clh_strcodigo',
                type: 'int',
                isPrimary: true,
            },
        ],
    });

    public foreignKeyClhStr = new TableForeignKey({
        columnNames: ['clh_strcodigo'],
        referencedColumnNames: ['str_codigo'],
        referencedTableName: 'setor',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaClassificaHora);
        await queryRunner.createForeignKey(this.tabelaClassificaHora, this.foreignKeyClhStr);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaClassificaHora);
    }
}
