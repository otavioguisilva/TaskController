import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class criaSetor1600906076193 implements MigrationInterface {
    public tabelaSetor = new Table({
        name: 'setor',
        columns: [
            {
                name: 'str_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: false,
                isUnique: true,
            },
            {
                name: 'str_descricao',
                type: 'varchar',
                length: '50',
                isPrimary: true,
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaSetor);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaSetor);
    }
}
