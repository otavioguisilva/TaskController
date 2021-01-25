import {  MigrationInterface, QueryRunner, Table,  TableForeignKey } from 'typeorm';

export class criaEnderecoeContato1605897124306 implements MigrationInterface {
    private tabelaContato = new Table({
        name: 'contatocli',
        columns: [
            {
                name: 'cnt_codigo',
                type: 'int',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'cnt_clicodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'cnt_telefone',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'cnt_descricao',
                type: 'varchar',
                length: '30',
                isNullable: true,
            },
            {
                name: 'cnt_email',
                type: 'varchar',
                length: '255',
                isNullable: true,
            },
        ],
    });

    private foreignKeyCntCli = new TableForeignKey({
        columnNames: ['cnt_clicodigo'],
        referencedTableName: 'cliente',
        referencedColumnNames: ['cli_codigo'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    });

    private tabelaEndereco = new Table({
        name: 'endereco',
        columns: [
            {
                name: 'end_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'end_clicodigo',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'end_cep',
                type: 'int',
                isPrimary: true,
                isNullable: false,
            },
            {
                name: 'end_logradouro',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name: 'end_numero',
                type: 'varchar',
                length: '10',
            },
            {
                name: 'end_bairro',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'end_cidade',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'end_uf',
                type: 'varchar',
                length: '2',
            },
        ],
    });

    private foreignKeyEndCli = new TableForeignKey({
        columnNames: ['end_clicodigo'],
        referencedColumnNames: ['cli_codigo'],
        referencedTableName: 'cliente',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaContato);
        await queryRunner.createTable(this.tabelaEndereco);
        await queryRunner.createForeignKey(this.tabelaContato, this.foreignKeyCntCli);
        await queryRunner.createForeignKey(this.tabelaEndereco, this.foreignKeyEndCli);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaContato);
        queryRunner.dropTable(this.tabelaEndereco);
    }
}
