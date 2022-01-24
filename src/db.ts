import "reflect-metadata";
import { createConnection } from 'typeorm';

export const connection = createConnection();


connection.then(async (c) => {
  await c.runMigrations();
}).catch((error) => {
  console.log(error);
})

