import { type } from 'os';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaTarefa1600914868082 implements MigrationInterface {
    private tabelaTarefas = new Table({
        name: 'tarefa',
        columns: [
            {
                name: 'tar_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'tar_titulo',
                type: 'varchar',
                length: '50',
                isNullable: false,
            },
            {
                name: 'tar_descricao',
                type: 'longtext',
                isNullable: false,
            },
            {
                name: 'tar_cltcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'tar_dthrabert',
                type: 'datetime',
                isNullable: false,
            },
            {
                name: 'tar_status',
                type: 'varchar',
                length: '1',
                default: "'A'",
            },
            {
                name: 'tar_usrcodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'tar_dthrfecha',
                type: 'datetime',
                isNullable: true,
            },
        ],
    });

    private foreignKeyTarUsr = new TableForeignKey({
        columnNames: ['tar_usrcodigo'],
        referencedColumnNames: ['usr_codigo'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        referencedTableName: 'usuario',
    });

    private foreignKeyTarClt = new TableForeignKey({
        columnNames: ['tar_cltcodigo'],
        referencedColumnNames: ['clt_codigo'],
        referencedTableName: 'classificatar',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaTarefas);
        await queryRunner.createForeignKeys(this.tabelaTarefas, [this.foreignKeyTarUsr, this.foreignKeyTarClt]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaTarefas);
    }
}
