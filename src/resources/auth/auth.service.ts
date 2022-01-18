import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { UserEntity } from '../../entities/User';
import { connection } from '../../db';
import { JWT_SECRET_KEY } from '../../common/config';

const jwt = require('jsonwebtoken');

interface IAuth {
  login: string;
  password: string;
}

async function authorization(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { login, password } = <IAuth>req.body;
  console.log(password);
  await connection
    .then(async () => {
      const user = await getRepository(UserEntity).findOne({where: {login}})
      if(user && compareSync(password, user.password)){
        const token = jwt.sign({
          userId: user.id,
          login: user.login
        }, JWT_SECRET_KEY)
        reply.send({token: `${token}`})
      } else {
        reply.code(403).send(new Error());
      }
      
    })
    .catch((err) => {
      console.log(err);
    })
}

export { authorization }