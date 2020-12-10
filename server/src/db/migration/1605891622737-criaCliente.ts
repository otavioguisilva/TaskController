import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaCliente1605891622737 implements MigrationInterface {
    private tabelaGrupoCliente = new Table({
        name: 'grupocliente',
        columns: [
            {
                name: 'grc_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'grc_descricao',
                type: 'varchar',
                length: '255',
            },
        ],
    });

    private tabelaCliente = new Table({
        name: 'cliente',
        columns: [
            {
                name: 'cli_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'cli_razao',
                type: 'varchar',
                length: '60',
                isNullable: false,
            },
            {
                name: 'cli_fantasia',
                type: 'varchar',
                length: '150',
            },
            {
                name: 'cli_tipopessoa',
                type: 'varchar',
                length: '1',
                default: "'J'",
            },
            {
                name: 'cli_cpfcnpj',
                type: 'varchar',
                length: '20',
            },
            {
                name: 'cli_inscricao',
                type: 'varchar',
                length: '20',
                isNullable: false,
                default: "'ISENTO'",
            },
            {
                name: 'cli_grccodigo',
                type: 'int',
                isNullable: true,
            },
            {
                name: 'cli_atvcodigo',
                type: 'int',
                isNullable: true,
            },
            {
                name: 'cli_contato',
                type: 'varchar',
                length: '255',
                isNullable: true,
            },
        ],
    });

    private foreignKeyCliGrc = new TableForeignKey({
        columnNames: ['cli_grccodigo'],
        referencedColumnNames: ['grc_codigo'],
        referencedTableName: 'grupocliente',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaGrupoCliente);
        await queryRunner.createTable(this.tabelaCliente);
        await queryRunner.createForeignKey(this.tabelaCliente, this.foreignKeyCliGrc);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaGrupoCliente);
        queryRunner.dropTable(this.tabelaCliente);
    }
}
