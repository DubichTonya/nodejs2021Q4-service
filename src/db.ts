import { hashSync } from 'bcrypt';
import "reflect-metadata";
import { createConnection, getRepository } from 'typeorm';
import { UserEntity } from './entities/User';

export const connection = createConnection();


connection.then(async (c) => {
  await c.runMigrations();
  const adminData = await getRepository(UserEntity).create({
    login: 'admin',
    password: hashSync('admin', 10)
  })
  await getRepository(UserEntity).save(adminData)
  console.log(adminData);
}).catch((error) => {
  console.log(error);
})

