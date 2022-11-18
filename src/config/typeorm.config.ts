import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'admin',
  connectorPackage: 'mysql2',
  database: 'market_store',
  synchronize: true,
  autoLoadEntities: true,
  migrationsRun: true,
};
