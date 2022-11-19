import { Options } from '@mikro-orm/core';

const mikroOrmConfig: Options = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  dbName: 'market_store',
  user: 'root',
  password: 'admin',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;
