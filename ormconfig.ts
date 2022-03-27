import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dotenv = require('dotenv');
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASSWORD,
  database: 'db',
  synchronize: false,
  entities: ['dist/src/entities/**/*.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
