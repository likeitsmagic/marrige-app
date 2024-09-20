import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { config } from 'dotenv';

config();

const connectionOptions: DataSourceOptions = {
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
};

export default new DataSource({
  ...connectionOptions,
});
