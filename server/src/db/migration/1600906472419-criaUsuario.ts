import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class criaUsuario1600906472419 implements MigrationInterface {
    public tabelaUsuario = new Table({
        name: 'usuario',
        columns: [
            {
                name: 'usr_codigo',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                isUnique: true,
            },
            {
                name: 'usr_login',
                type: 'varchar',
                length: '20',
                isPrimary: true,
            },
            {
                name: 'usr_nomecompleto',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'usr_email',
                type: 'varchar',
                length: '255',
                isUnique: true,
            },
            {
                name: 'usr_senha',
                type: 'varchar',
                length: '15',
            },
            {
                name: 'usr_strcodigo',
                type: 'int',
                isPrimary: true,
            },
            {
                name: 'usr_dtnascimento',
                type: 'date',
                isNullable: false,
            },
            {
                name: 'usr_caminhofoto',
                type: 'varchar',
                length: '255',
                isUnique: true,
                default: '" "',
            },
        ],
    });

    public foreignKeyUsrStr = new TableForeignKey({
        columnNames: ['usr_strcodigo'],
        referencedColumnNames: ['str_codigo'],
        referencedTableName: 'setor',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tabelaUsuario);
        await queryRunner.createForeignKey(this.tabelaUsuario, this.foreignKeyUsrStr);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(this.tabelaUsuario);
    }
}
