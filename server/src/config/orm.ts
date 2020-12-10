import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const options: TypeOrmModuleOptions = {
    database: 'taskcontroller',
    type: 'mysql',
    logging: true,
    port: 3306,
    username: 'root',
    password: '@kalunga123',
    synchronize: false,
    host: '192.168.0.27',
    entities: [path.resolve(__dirname, '..', 'db', 'entity', '*')],
    migrations: [path.resolve(__dirname, '..', 'db', 'migration', '*')],
    subscribers: [path.resolve(__dirname, '..', 'db', 'subscriber', '*')],
    cli: {
        entitiesDir: 'src/db/entity',
        migrationsDir: 'src/db/migration',
        subscribersDir: 'src/db/subscriber',
    },
};

module.exports = options;
