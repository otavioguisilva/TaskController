import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaHoraTarAut1605819056363 implements MigrationInterface {
    private tabelaHoraTarAut = new Table({
        name: 'horatarefaaut',
        columns: [
            {
                name: 'hta_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'hta_htrcodigo',
                type: 'int',
                isPrimary: true,
                isNullable: false,
            },
            {
                name: 'hta_dthrini',
                type: 'datetime',
            },
            {
                name: 'hta_dthrfim',
                type: 'datetime',
                isNullable: true,
            },
        ],
    });

    private foreignKeyHtaHtr = new TableForeignKey({
        columnNames: ['hta_htrcodigo'],
        referencedColumnNames: ['htr_codigo'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        referencedTableName: 'horatarefa',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaHoraTarAut);
        await queryRunner.createForeignKey(this.tabelaHoraTarAut, this.foreignKeyHtaHtr);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaHoraTarAut);
    }
}
