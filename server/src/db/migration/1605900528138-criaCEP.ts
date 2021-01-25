import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class criaCEP1605900528138 implements MigrationInterface {
    private tabelaCEP = new Table({
        name: 'cep',
        columns: [
            {
                name: 'cep_codigo',
                type: 'int',
            },
            {
                name: 'cep_logradouro',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'cep_bairro',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'cep_cidade',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'cep_uf',
                type: 'varchar',
                length: '2',
            },
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaCEP);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tabelaCEP);
    }
}
