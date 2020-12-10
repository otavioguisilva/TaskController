import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaHoraTarefa1600915761426 implements MigrationInterface {
    private tabelaHoraTarefa = new Table({
        name: 'horatarefa',
        columns: [
            {
                name: 'htr_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'htr_tarcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'htr_usrcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'htr_clhcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'htr_data',
                type: 'date',
                isNullable: false,
            },
            {
                name: 'htr_tipo',
                type: 'varchar',
                length: '1',
                default: "'A'",
            },
            {
                name: 'htr_horas',
                type: 'int',
                width: 2,
                isNullable: false,
                default: '0',
            },
            {
                name: 'htr_minutos',
                type: 'int',
                width: 2,
                isNullable: false,
                default: '0',
            },
            {
                name: 'htr_descricao',
                type: 'varchar',
                length: '255',
                isNullable: true,
            },
            {
                name: 'htr_status',
                type: 'varchar',
                length: '1',
                isNullable: false,
                default: "'A'",
            },
        ],
    });

    private foreignKeyHtrTar = new TableForeignKey({
        columnNames: ['htr_tarcodigo'],
        referencedColumnNames: ['tar_codigo'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        referencedTableName: 'tarefa',
    });

    private foreignKeyHtrUsr = new TableForeignKey({
        columnNames: ['htr_usrcodigo'],
        referencedColumnNames: ['usr_codigo'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        referencedTableName: 'usuario',
    });

    private foreignKeyHtrClh = new TableForeignKey({
        columnNames: ['htr_clhcodigo'],
        referencedColumnNames: ['clh_codigo'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        referencedTableName: 'classificahora',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaHoraTarefa);
        await queryRunner.createForeignKeys(this.tabelaHoraTarefa, [this.foreignKeyHtrUsr, this.foreignKeyHtrTar, this.foreignKeyHtrClh]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaHoraTarefa);
    }
}
