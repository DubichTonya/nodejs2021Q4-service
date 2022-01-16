import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  "type": "postgres",
  "host": process.env.POSTGRES_HOST,
  "port": process.env.POSTGRES_PORT,
  "username": process.env.POSTGRES_NAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": "db",
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/entities/**/*.ts"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migrations"
  }

}